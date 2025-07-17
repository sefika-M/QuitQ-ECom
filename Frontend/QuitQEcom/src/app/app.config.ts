import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient} from '@angular/common/http';
import { AuthGuard } from './auth/auth-guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    AuthGuard,
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
  )
  ]
};
