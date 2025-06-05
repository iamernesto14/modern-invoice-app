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



/**EFFECTS (current understanding)
 * IMPORTANT: action
 * IMPORTANT: create effects using createEffect()
 * 
 * ACTION: this is what triggers the effects (you pass the action in the typeof () to specify the typeof action you would be triggering the effects on)
 * CREATEEFFECT(): this is what you use to create the effect
 * the create effects takes two parameters
 *  a function with the logic (this function takes in the Action that would trigger the effect)
 *  an object boolean which signifies if the effect would trigger another actions or not (when set to false it does not trigger another action)
 * 
 * this.actions$.pipe(

    )
 * 
 */