import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, FormsModule, Form, FormArray } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidV4 } from 'uuid';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';


import { AppState } from '../../interfaces/AppState.interface';
import { addInvoice, updateInvoice } from '../../state/invoice/actions/loadData.action';
import { GoBack } from '../go-back/go-back';
import { map, Observable, tap } from 'rxjs';
import { selectInvoice } from '../../state/invoice/selectors/loadData.selector';
import { InvoiceState } from '../../state/invoice/reducers/loadData.reducer';
import { LoadDataInterface } from '../../interfaces/loadData.interface';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, GoBack],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.css'
})
export class InvoiceForm implements OnInit{

  form!:FormGroup
  paymentOptions: Array<{ value: number, label: string }> = [
    { value: 1, label: 'Net 1 Day' },
    { value: 7, label: 'Net 7 Day' },
    { value: 14, label: 'Net 14 Day' },
    { value: 30, label: 'Net 30 Day' },
    ];
    isNewForm!:boolean;
    invoiceData$!: Observable<LoadDataInterface | undefined>;
    invoiceId!:string;

  constructor (
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  };
  
  ngOnInit(): void {
    this.form = this.fb.group({
      senderAddress: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      clientAddress: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        street: ['', Validators.required],
        city: ['', Validators.required],
        postCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      createdAt: ['', Validators.required],
      paymentTerms: ['', Validators.required],
      description: ['', Validators.required],
      // status: ['', Validators.required],
      items: this.fb.array([]),
  
    })

    this.isNewForm = true;
    // this.activatedRoute.paramMap.subscribe(val => console.log(val));

    // this.activatedRoute.paramMap.subscribe(
    //   val => {
    //     const d = val.get('form');
    //     console.log(d);
    //   }
    // )

    // this.activatedRoute.params.subscribe(params => {
    //   // Access the route parameters directly from the params object
    //   const id = params;
    //   console.log('Route parameter id:', id);
    // });

        // Access route path segments
        const routeSnapshot = this.activatedRoute.snapshot;
        const routePath = routeSnapshot.url.map(segment => segment.path).join('/');
        
        if (routePath === 'new-form') {
          this.isNewForm = true;
        } else {
          this.isNewForm = false;
          this.invoiceData$ = this.store.select(selectInvoice);

          this.invoiceData$.subscribe(data => {
            if (data) {
              this.invoiceId = data.id;
              this.patchFormWithData(data);
            }
          })

        }

    
    
  }


  patchFormWithData(data: any) {
    this.form.patchValue({
      senderAddress: {
        street: data.senderAddress.street,
        city: data.senderAddress.city,
        postCode: data.senderAddress.postCode,
        country: data.senderAddress.country,
      },
      clientAddress: {
        name: data.clientName,
        email: data.clientEmail,
        street: data.clientAddress.street,
        city: data.clientAddress.city,
        postCode: data.clientAddress.postCode,
        country: data.clientAddress.country,
      },
      createdAt: data.createdAt,
      paymentTerms: data.paymentTerms,
      description: data.description,
    });

    // Clear existing items
    (this.form.get('items') as FormArray).clear();

    // Add items to the form array
    data.items.forEach((item: any) => {
      const itemGroup = this.fb.group({
        name: [item.name, Validators.required],
        quantity: [item.quantity, Validators.required],
        price: [item.price, Validators.required],
        total: [item.total],
      });
      (this.form.get('items') as FormArray).push(itemGroup);
    });
  }

  get itemsFormArray() {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    const itemForm = this.fb.group({
      name: [''],
      quantity: [0],
      price:[''],
      total:[''],
    });
    this.itemsFormArray.push(itemForm);
  }

  removeItem(index: number) {
    this.itemsFormArray.removeAt(index);
  }

  handleFormSubmission () {

    console.log('triggered...')
    
    const uuid = uuidV4();
    const id = uuid.slice(0, 6);
    
    const {clientAddress: { name: clientName, email: clientEmail, ...clientAddress }, ...formData} = this.form.value;

    const total = this.calculateTotalSum(formData.items, 'total')

    // CALCULATE AND ADD PAYMENT DUE
    const invoice = {
      id,
      clientAddress,
      clientName,
      clientEmail,
      ...formData,
      status: 'paid',
      total,
    }
    
    this.store.dispatch(addInvoice({invoice}));
    this.router.navigate([''])

    
  }
  

  calculateTotalSum<T>(data: T[], key: keyof T): number {
    return data.reduce((accumulator, item) => accumulator + (item[key] as unknown as number), 0);
  }

  saveEditedChanges () {
    const {clientAddress: { name: clientName, email: clientEmail, ...clientAddress }, ...formData} = this.form.value;

    const total = this.calculateTotalSum(formData.items, 'total')
    // console.log(total);

    // CALCULATE AND ADD PAYMENT DUE
    const invoice = {
      id: this.invoiceId,
      clientAddress,
      clientName,
      clientEmail,
      ...formData,
      status: 'paid',
      total,
    }
    
    this.store.dispatch(updateInvoice({invoice: {
      id: this.invoiceId,
      changes: invoice,
    }}));
    
  }
  


  
}


