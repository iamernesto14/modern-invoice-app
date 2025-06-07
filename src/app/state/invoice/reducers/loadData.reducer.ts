import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// local import
import {
  onLoadDataAction,
  loadDataOnSuccess,
  loadDataOnFailure,
  addInvoice,
  deleteInvoice,
  updateInvoice,
  // dataLoadingActions,
} from '../actions/loadData.action';
import { LoadDataInterface } from '../../../interfaces/loadData.interface';
import {
  detailedInvoice,
  filterInvoice,
  FilterCriteriaType,
} from '../actions/loadData.action';

// export interface InvoiceState {
//   data: LoadDataInterface[];
//   filteredData: LoadDataInterface[];
//   filterCriteria: FilterCriteriaType;
//   selectedInvoiceId: string;
//   // filterCriteria: string;
//   loading: boolean;
//   error: string;
// }

// const initialState:InvoiceState = {
//   data: [],
//   filteredData: [],
//   filterCriteria: {paid: false, pending: false, draft: false},
//   selectedInvoiceId: '',
//   loading: false,
//   error: '',
// };

// defining or extending the entity state
export interface InvoiceState extends EntityState<LoadDataInterface> {
  filterCriteria: FilterCriteriaType;
  selectedInvoiceId: string;
  loading: boolean;
  error: string;
}

export const invoiceAdapter: EntityAdapter<LoadDataInterface> =
  createEntityAdapter<LoadDataInterface>();

// initialize or declare a new initial state
export const initialInvoiceState: InvoiceState = invoiceAdapter.getInitialState(
  {
    filterCriteria: { paid: false, pending: false, draft: false },
    selectedInvoiceId: '',
    loading: false,
    error: '',
  }
);

export const loadDataReducer = createReducer(
  initialInvoiceState,
  on(onLoadDataAction, (state) => ({ ...state })),
  on(loadDataOnSuccess, (state, { data }) =>
    invoiceAdapter.setAll(data, { ...state, loading: true })
  ),
  
  on(loadDataOnFailure, (state, { error }) => ({ ...state, error })),
  on(filterInvoice, (state, { filterCriteria }) =>
    // console.log(filterCriteria),
    ({ ...state, filterCriteria })
  ),
  on(detailedInvoice, (state, { selectedInvoiceId }) => ({
    ...state,
    selectedInvoiceId,
  })),
  on(
    addInvoice,
    (state, { invoice }) => (
      console.log(invoice), invoiceAdapter.addOne(invoice, state)
    )
  ),
  on(updateInvoice, (state, { invoice }) => {
    console.log(invoice);
    return invoiceAdapter.updateOne(invoice, state);
  }),
  on(deleteInvoice, (state, { id }) => invoiceAdapter.removeOne(id, state))
);