import { createSelector } from "@ngrx/store";
import { AppState } from "../../../interfaces/AppState.interface";
import { ThemeState } from "../../../model/theme.model";

// export const selectInvoiceFeature = (state: AppState) => state.invoice;
const themeFeature = (state:AppState) => state.theme;


export const selectTheme = createSelector(
    themeFeature,
    (theme:ThemeState) => (
        console.log(theme), 
        theme.themeState
    ),
)

