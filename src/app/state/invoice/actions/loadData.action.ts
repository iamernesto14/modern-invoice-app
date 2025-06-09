import { createAction, props } from "@ngrx/store";
import { LoadDataInterface } from "../../../interfaces/loadData.interface";
import { Update } from "@ngrx/entity";
// defining action type
export const LOAD_INVOICE_DATA = '[Load Invoice] loads initial data'
export const SUCCESS = '[Load Invoice] loads data successfully'
export const FAILURE = '[Load Invoice] Failed to load data'

// defining action creator
export const onLoadDataAction = createAction(LOAD_INVOICE_DATA);
export const loadDataOnSuccess = createAction(
    SUCCESS,
    props<{data: LoadDataInterface[]}>()
)
export const loadDataOnFailure = createAction(
    FAILURE,
    props<{error: string}>()
)

// CRUD
export const addInvoice = createAction(
    '[Invoice API] Add Invoice',
    props<{ invoice: LoadDataInterface }>()
  );
  
  export const editInvoiceForm = createAction(
    '[Invoice API] display existing Invoice for edit',
    props<{ invoice: LoadDataInterface }>()
  );
  export const updateInvoice = createAction(
    '[Invoice API] Update Invoice',
    props<{ invoice: Update<LoadDataInterface> }>()
    // props<{ invoice: LoadDataInterface }>()
  );

  export const confirmDelete = createAction(
    '[Invoice API] Confirm delete',
    props<{id: string}>(),
  )
  
  export const deleteInvoice = createAction(
    '[Invoice API] Delete Invoice',
    props<{ id: string }>()
  );


  export interface FilterCriteriaType {
    pending: boolean,
    paid: boolean,
    draft: boolean,
}

  const FILTER = '[Filter] filtering invoice data'
export const filterInvoice = createAction(
    FILTER,
    props<{filterCriteria: FilterCriteriaType}>(),
)

// selected invoice
const SELECTED_INVOICE = '[Selected invoice] routes to the selected invoice';
export const detailedInvoice = createAction(
    SELECTED_INVOICE,
    props<{selectedInvoiceId: string}>(),
)