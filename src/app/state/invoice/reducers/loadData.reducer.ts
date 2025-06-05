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
// import { detailedInvoice, FilterCriteriaType, filterInvoice } from '../actions/filterInvoice.action';
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

// on(InvoiceActions.loadInvoices, (state, { invoices }) =>
//   invoiceAdapter.setAll(invoices, { ...state, loading: false })
// ),
// on(InvoiceActions.addInvoice, (state, { invoice }) =>
//   invoiceAdapter.addOne(invoice, state)
// ),
// on(InvoiceActions.updateInvoice, (state, { invoice }) =>
//   invoiceAdapter.updateOne({ id: invoice.id, changes: invoice }, state)
// ),
// on(InvoiceActions.deleteInvoice, (state, { id }) =>
//   invoiceAdapter.removeOne(id, state)
// ),
// on(InvoiceActions.selectInvoice, (state, { id }) =>
//   ({ ...state, selectedInvoiceId: id })
// ),
// on(InvoiceActions.setFilterCriteria, (state, { criteria }) =>
//   ({ ...state, filterCriteria: criteria })
// ),
// on(InvoiceActions.setLoading, (state, { loading }) =>
//   ({ ...state, loading })
// ),
// on(InvoiceActions.setError, (state, { error }) =>
//   ({ ...state, error })
// )

// export const _invoiceReducer = createReducer(
//   initialInvoiceState,
//   on(loadDataOnSuccess, (state, { data }) =>
//     invoiceAdapter.setAll(data, {
//       ...state,
//       loading: false  // Set loading to false if you want to update it
//     })
//   )
// );

// export const loadDataReducer = createReducer(
//   initialState,
//   on(onLoadDataAction, (state) => ({
//     ...state,
//   })),
//     on(loadDataOnSuccess, (state, { data }) => {
//       // console.log(data);
//       return {
//         ...state,
//         data: data,
//         filteredData: data,
//         loading: true,
//       }
//     }),
//     on(loadDataOnFailure, (state, { error }) => ({
//       ...state,
//       error: error,
//     })),
//     on(filterInvoice, (state, {filterCriteria}) => {
//       // console.log(filterCriteria)
//       return {
//         ...state,
//         filterCriteria,
//       }
//     }),
//     on(detailedInvoice, (state, {selectedInvoiceId}) => ({
//       ...state,
//       selectedInvoiceId
//     })),

// );

// const loadInvoiceFeature = (state: AppState) => state.invoice;

// const { selectIds, selectEntities, selectAll, selectTotal } = invoiceAdapter.getSelectors(selectInvoiceFeature);

// const selectInvoiceFeature = (state: AppState) => state.invoice;

// // Selector for the filter criteria
// export const selectFilterCriteria = createSelector(
//   selectInvoiceFeature,
//   (state: InvoiceState) => state.filterCriteria
// );

// // Selector for the loading state
// export const selectLoading = createSelector(
//   selectInvoiceFeature,
//   (state: InvoiceState) => state.loading
// );

// // Selector for the error state
// export const selectError = createSelector(
//   selectInvoiceFeature,
//   (state: InvoiceState) => state.error
// );

// // Selector for the selected invoice ID
// export const selectSelectedInvoiceId = createSelector(
//   selectInvoiceFeature,
//   (state: InvoiceState) => state.selectedInvoiceId
// );

// // Selector for the selected invoice entity
// export const selectSelectedInvoice = createSelector(
//   selectEntities,
//   selectSelectedInvoiceId,
//   (entities, selectedId) => selectedId ? entities[selectedId] : null
// );

// // Selector for filtered invoice data based on filter criteria
// export const selectFilteredInvoices = createSelector(
//   selectAll, // Get all entities
//   selectFilterCriteria,
//   (allInvoices, filterCriteria) => {
//     if (!filterCriteria.draft && !filterCriteria.paid && !filterCriteria.pending) {
//       return allInvoices;
//     }

//     return allInvoices.filter(invoice =>
//       (filterCriteria.paid && invoice.status === 'paid') ||
//       (filterCriteria.pending && invoice.status === 'pending') ||
//       (filterCriteria.draft && invoice.status === 'draft')
//     );
//   }
// );
