import { createAction, props } from "@ngrx/store";

export const TOGGLE_THEME = '[Theme API] toggles theme state';

export const toggleTheme = createAction(
    TOGGLE_THEME,
    props<{themeState: string}>(),
)