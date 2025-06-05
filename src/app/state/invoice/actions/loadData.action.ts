import { createAction, props } from "@ngrx/store";
import { LoadDataInterface } from "../../../interfaces/loadData.interface";
import { Update } from "@ngrx/entity";
// import { FilterCriteriaType } from "./filterInvoice.action";

// local imports
// import { LoadData } from '../../../interfaces/loadData.interface';

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










/**Action
 * this is a function which is used to trigger an event.
 * actions are use by reducers to perform an action or function
 * when the reducers needs to communicate with the store, actions are the propagators of that, or the initiators
 * action can be associated to the event method which triggers an event listener when you compare it to DOM JS knowledge or understanding
 *
 * IMPORTANT: type
 * IMPORTANT: props / payload
 *
 * an action creator takes in two parameters
 *  a type which is used to determine the action that is being triggered
 *  a prop which carries a payload
 */
