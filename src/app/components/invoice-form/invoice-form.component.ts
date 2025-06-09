import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { v4 as uuidV4 } from 'uuid';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

// local module imports
import { AppState } from '../../interfaces/AppState.interface';
import { addInvoice, updateInvoice } from '../../state/invoice/actions/loadData.action';
import { GoBackComponent } from '../go-back/go-back.component';
import { selectInvoice } from '../../state/invoice/selectors/loadData.selector';
import { LoadDataInterface } from '../../interfaces/loadData.interface';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, GoBackComponent, CommonModule],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.scss'
})
export class InvoiceFormComponent implements OnInit {
  form!: FormGroup;
  paymentOptions: Array<{ value: number, label: string }> = [
    { value: 1, label: 'Net 1 Day' },
    { value: 7, label: 'Net 7 Days' },
    { value: 14, label: 'Net 14 Days' },
    { value: 30, label: 'Net 30 Days' }
  ];
  isNewForm!: boolean;
  invoiceData$!: Observable<LoadDataInterface | undefined>;
  invoiceId!: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      senderAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required]
      }),
      clientAddress: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required]
      }),
      createdAt: ['', Validators.required],
      paymentTerms: ['', Validators.required],
      description: ['', Validators.required],
      items: this.fb.array([])
    });

    const routeSnapshot = this.activatedRoute.snapshot;
    const routePath = routeSnapshot.url.map(segment => segment.path).join('/');
    
    if (routePath === 'new-form') {
      this.isNewForm = true;
      this.addItem(); // Add one item initially for new form
    } else {
      this.isNewForm = false;
      this.invoiceId = routeSnapshot.paramMap.get('id') || '';
      this.invoiceData$ = this.store.select(selectInvoice);
      this.invoiceData$.subscribe(data => {
        if (data) {
          this.invoiceId = data.id;
          this.patchFormWithData(data);
        }
      });
    }
  }

  patchFormWithData(data: any) {
    this.form.patchValue({
      senderAddress: {
        street: data.senderAddress.street,
        city: data.senderAddress.city,
        postCode: data.senderAddress.postCode,
        country: data.senderAddress.country
      },
      clientAddress: {
        name: data.clientName,
        email: data.clientEmail,
        street: data.clientAddress.street,
        city: data.clientAddress.city,
        postCode: data.clientAddress.postCode,
        country: data.clientAddress.country
      },
      createdAt: data.createdAt,
      paymentTerms: data.paymentTerms,
      description: data.description
    });

    // Clear existing items
    this.itemsFormArray.clear();

    // Add items to the form array
    data.items.forEach((item: any) => {
      const itemGroup = this.fb.group({
        name: [item.name, Validators.required],
        quantity: [item.quantity, [Validators.required, Validators.min(0)]],
        price: [item.price, [Validators.required, Validators.min(0)]]
      });
      this.itemsFormArray.push(itemGroup);
    });
  }

  get itemsFormArray(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    const itemForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
    this.itemsFormArray.push(itemForm);
  }

  removeItem(index: number) {
    this.itemsFormArray.removeAt(index);
  }

  getItemTotal(index: number): number {
    const item = this.itemsFormArray.at(index) as FormGroup;
    const quantity = Number(item.get('quantity')?.value) || 0;
    const price = Number(item.get('price')?.value) || 0;
    return quantity * price;
  }

  calculateTotalSum(): number {
    const items = this.itemsFormArray.value;
    return items.reduce((sum: number, item: any) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      return sum + (quantity * price);
    }, 0);
  }

  handleFormSubmission() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    const uuid = uuidV4();
    const id = uuid.slice(0, 6);
    const { clientAddress: { name: clientName, email: clientEmail, ...clientAddress }, ...formData } = this.form.value;
    const total = this.calculateTotalSum();

    // Calculate payment due date based on createdAt and paymentTerms
    const createdAt = new Date(formData.createdAt);
    const paymentTerms = Number(formData.paymentTerms) || 0;
    const paymentDue = new Date(createdAt.getTime() + paymentTerms * 24 * 60 * 60 * 1000);
    
    const invoice = {
      id,
      clientAddress,
      clientName,
      clientEmail,
      ...formData,
      paymentDue: paymentDue.toISOString().split('T')[0], // Format as YYYY-MM-DD
      status: 'pending', // Default to 'pending' for new invoices
      total,
      items: formData.items.map((item: any, index: number) => ({
        ...item,
        total: this.getItemTotal(index)
      }))
    };

    this.store.dispatch(addInvoice({ invoice }));
    this.router.navigate(['']);
  }

  saveEditedChanges() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    const { clientAddress: { name: clientName, email: clientEmail, ...clientAddress }, ...formData } = this.form.value;
    const total = this.calculateTotalSum();

    // Calculate payment due date based on createdAt and paymentTerms
    const createdAt = new Date(formData.createdAt);
    const paymentTerms = Number(formData.paymentTerms) || 0;
    const paymentDue = new Date(createdAt.getTime() + paymentTerms * 24 * 60 * 60 * 1000);

    const invoice = {
      id: this.invoiceId,
      clientAddress,
      clientName,
      clientEmail,
      ...formData,
      paymentDue: paymentDue.toISOString().split('T')[0], // Format as YYYY-MM-DD
      status: 'pending', // Preserve 'pending' or adjust based on your logic
      total,
      items: formData.items.map((item: any, index: number) => ({
        ...item,
        total: this.getItemTotal(index)
      }))
    };

    this.store.dispatch(updateInvoice({ invoice: {
      id: this.invoiceId,
      changes: invoice
    }}));
    this.router.navigate(['invoice', this.invoiceId]);
  }

  cancelForm() {
    if (this.isNewForm) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['invoice', this.invoiceId]);
    }
  }
}