// interface to define the shape of the data (initial state)
// initial value and type it by the interface

import { createReducer, on } from "@ngrx/store";
import { LoadDataInterface } from "../../../interfaces/loadData.interface";
// import { filterInvoiceByDraft } from "../actions/filterInvoice.action";

export interface FilterInvoiceState {
    filteredData: LoadDataInterface[];
    filterCriteria: string;

}

const initialState: FilterInvoiceState = {
    filteredData: [],
    filterCriteria: '',
}

// export const filterReducer = createReducer(
//     initialState,
//     // on(filterInvoiceByDraft, (state, { payload}) => ({...state})),
//     on(filterInvoiceByDraft, (state, { filterCriteria}) => {
//         console.log(filterCriteria);
//         return ({...state, status: filterCriteria});
//     }),
// )
