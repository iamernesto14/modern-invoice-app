import { createReducer, on } from "@ngrx/store";
import { toggleTheme } from "../action/theme.action";
import { ThemeState } from "../../../model/theme.model";


const initialThemeState: ThemeState = {
    themeState: 'light-mode',
}

export const themeReducer = createReducer(
    initialThemeState,
    on(toggleTheme, (state, {themeState}) => ({...state, themeState}))
)