import { createSelector, props } from "@ngrx/store";
import { AppState } from "../../../interfaces/AppState.interface";
import { FilterInvoiceState } from "../reducers/filterInvoice.reducer";
import { InvoiceState } from "../reducers/loadData.reducer";

// interfaces
// feature selector
// create selector function selector

// const filterFeature = (state:AppState) => state.invoice;

// export const selectFilterFeature = createSelector(
//     filterFeature,
//     (invoice:InvoiceState, props:FilterInvoiceState) => {
//         const data = invoice.data;
//         const result = data.filter(invoice => invoice.status === props.filterCriteria);
//         console.log(invoice, props);
//         console.log(result);
//         return result;
//         // invoice.data
//     }
// )