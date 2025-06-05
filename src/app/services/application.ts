import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  isDeleteModalActive:boolean = false;
  private deleteModalSubject$ = new BehaviorSubject<boolean>(false);
  isModalActive:Observable<boolean> = this.deleteModalSubject$.asObservable();

  id!:string;
  private invoiceIdSubject$ = new BehaviorSubject<string>('');
  invoiceId:Observable<string> = this.invoiceIdSubject$.asObservable();
  

  constructor() {}

   setInvoiceId(id:string) {
    this.id = id;
    this.invoiceIdSubject$.next(id);
   }

   toggleModal (state:boolean) {
    this.deleteModalSubject$.next(state);
   }

   displayDeleteModal (id:string) {
    //  this.isDeleteModalActive = true;
    this.toggleModal(true);
     this.setInvoiceId(id);
   }

   removeDeleteModal () {
    this.toggleModal(false);
    // this.isDeleteModalActive = false;
  }
  

}
