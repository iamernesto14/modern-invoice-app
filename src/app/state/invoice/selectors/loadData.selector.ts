import { createSelector } from '@ngrx/store';

import { AppState } from '../../../interfaces/AppState.interface';
import { invoiceAdapter, InvoiceState } from '../reducers/loadData.reducer';
// import { FilterCriteriaType } from '../actions/filterInvoice.action';
import { LoadDataInterface } from '../../../interfaces/loadData.interface';
import { FilterCriteriaType } from '../actions/loadData.action';



export const selectInvoiceFeature = (state: AppState) => state.invoice;

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = invoiceAdapter.getSelectors(selectInvoiceFeature);

export const selectFilter = createSelector(
  selectInvoiceFeature,
  (invoiceState: InvoiceState) => invoiceState.filterCriteria
);

export const selectLoadInvoice = createSelector(
  selectAll,
  selectFilter,
  (invoices: LoadDataInterface[], filter: FilterCriteriaType) => {
    if (!filter.draft && !filter.paid && !filter.pending) {
      return invoices;
    }
    
    return invoices.filter(
      (invoice) =>
        (filter.paid && invoice.status === 'paid') ||
        (filter.pending && invoice.status === 'pending') ||
        (filter.draft && invoice.status === 'draft')
    );
  }
);

export const selectLoadState = createSelector(
  selectInvoiceFeature,
  (invoiceState: InvoiceState) => invoiceState.loading
);

export const selectInvoice = createSelector(
  selectAll,
  selectInvoiceFeature,
  (invoices: LoadDataInterface[], invoiceState: InvoiceState) => {
    const { selectedInvoiceId } = invoiceState;
    return invoices.find(invoice => invoice.id === selectedInvoiceId);
  }
);

// const selectInvoiceFeature = (state: AppState) => state.invoice;

// export const {
//   selectIds,
//   selectEntities,
//   selectAll,
//   selectTotal
// } = invoiceAdapter.getSelectors(selectInvoiceFeature);
// // const { selectIds, selectEntities, selectAll, selectTotal } = invoiceAdapter.getSelectors(selectInvoiceFeature);


// export const selectFilter = createSelector(
//   selectInvoiceFeature,
//   (invoiceFeature: InvoiceState) => {
//     return invoiceFeature.filterCriteria;
//   }
// );

// export const selectLoadInvoice = createSelector(
//   selectInvoiceFeature,
//   selectFilter,
//   (invoiceFeature: InvoiceState, selectFilter) => {
//     console.log(selectInvoiceFeature, invoiceFeature)
//     if (!selectFilter.draft && !selectFilter.paid && !selectFilter.pending) {
//       return invoiceFeature.filteredData;
//     }
    
//     return invoiceFeature.data.filter(
//       (invoice) =>
//         (selectFilter.paid && invoice.status === 'paid') ||
//         (selectFilter.pending && invoice.status === 'pending') ||
//         (selectFilter.draft && invoice.status === 'draft')
//     );
    
//   }
// );

// // select the loading state
// export const selectLoadState = createSelector(
//   selectInvoiceFeature,
//   (invoiceFeature: InvoiceState) => invoiceFeature.loading,
// );

// // selects the selected invoice
// // export const selectInvoice = createSelector(
// //   selectInvoiceFeature,
// //   (invoiceFeature: InvoiceState) => invoiceFeature.loading,
// // );
// export const selectInvoice = createSelector(
//     selectInvoiceFeature,
//     (invoiceFeature: InvoiceState) => {
        
//         const { selectedInvoiceId } = invoiceFeature;
//         // console.log(selectedInvoiceId);
//         // console.log(invoiceFeature);
        
//         const invoice = invoiceFeature.data.filter(data => data.id === selectedInvoiceId);
//         return invoice;
        
//     },
// )

