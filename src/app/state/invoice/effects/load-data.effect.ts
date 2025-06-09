import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

// local module imports
import { confirmDelete, editInvoiceForm, LOAD_INVOICE_DATA, loadDataOnFailure, loadDataOnSuccess } from "../actions/loadData.action";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { LoadInvoiceDataService } from "../../../services/load-invoice-data.service";



@Injectable ()
export class LoadDataEffect {
    
    loadItems$ = createEffect(() =>
        this.actions$.pipe(
          ofType(LOAD_INVOICE_DATA),
          mergeMap(() =>
            this.invoiceService.fetchInvoiceData().pipe(
              map(data => loadDataOnSuccess({ data })),
              catchError(error => of(loadDataOnFailure({ error })))
            )
          )
        )
      );

      editInvoice$ = createEffect(() => (
        this.actions$.pipe(
          ofType(editInvoiceForm),
        )
      ))

      confirmDeleteInvoice$ = createEffect(() => 
        this.actions$.pipe(
          ofType(confirmDelete),
          tap(action => console.log(action))
        ), {dispatch: false}
      )
      
    
    constructor (
        private actions$: Actions,
        private invoiceService: LoadInvoiceDataService
    ) {};
}
