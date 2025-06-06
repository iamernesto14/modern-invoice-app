import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoadDataEffect } from './state/invoice/effects/load-data.effect';
import { loadDataReducer } from './state/invoice/reducers/loadData.reducer';
import { themeReducer } from './state/theme/reducer/theme.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
    ),
    provideEffects(
      LoadDataEffect
    ),
    provideStore(),
    provideState(
      {
      name: 'invoice', reducer: loadDataReducer
    },
    
  ),
  provideState(
    {
      name: 'theme', reducer: themeReducer
    },
  ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
