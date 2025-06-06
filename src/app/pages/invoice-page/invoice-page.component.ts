import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule, } from '@angular/common';
import { RouterLink } from '@angular/router';

// local module imports
import { selectLoadInvoice, selectLoadState } from '../../state/invoice/selectors/loadData.selector';
import { onLoadDataAction } from '../../state/invoice/actions/loadData.action';
import { AppState } from '../../interfaces/AppState.interface';
import { detailedInvoice, filterInvoice } from '../../state/invoice/actions/loadData.action';
import { StatusComponent } from '../../components/status/status.component';


@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [  CommonModule, RouterLink, StatusComponent ],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.scss'
})
export class InvoicePageComponent implements OnInit {
  isEmpty:boolean = false;
  data = this.store.select(selectLoadInvoice);
  state = this.store.select(selectLoadState);
  filterOptions = {paid: false, pending: false, draft: false};
  isFormActive:boolean = false;

  
  constructor (
    private store: Store<AppState>,
  ) {}
  
  ngOnInit(): void {
  }

  displayDropDownMenu () {
    this.isEmpty = !this.isEmpty;
  }

  filterInvoiceData (event:MouseEvent) {
    // return;
    const target = event.target as HTMLInputElement;
    const { name } = target;
    const isChecked = target.checked;

    this.filterOptions = {
      ...this.filterOptions,
      [name]: isChecked,
    };

    this.store.dispatch(filterInvoice({ filterCriteria: this.filterOptions}));

  }
  handleSelectedInvoice (invoiceId:string) {

    this.store.dispatch(detailedInvoice({selectedInvoiceId: invoiceId}))
  }

  displayForm ():void {
    // this.isFormActive = !this.isFormActive;
    this.isFormActive = true;
    // console.log(this.isFormActive);
  }
  
}
