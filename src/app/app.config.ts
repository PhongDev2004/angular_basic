import {
  ApplicationConfig,
  booleanAttribute,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(HttpClient),
    provideHttpClient(withFetch()),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), provideAnimationsAsync(),
  ],
};
