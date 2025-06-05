import { LoadDataInterface } from "./loadData.interface"
import { InvoiceState } from "../state/invoice/reducers/loadData.reducer"
import { ThemeState } from "../model/theme.model"

// import the invoice model
import { Invoice } from "../model/invoice.model"

export interface AppState {
    invoice: InvoiceState,
    // themes: ThemeState,
    theme: ThemeState,
}

// export interface InvoiceFeature {
//     dataLoadingFeature: InvoiceState,
// }