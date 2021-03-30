import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

/* `{ providedIn: 'root' }` has been deleted as an interceptor is manually provided in `AppModule` */
// eslint-disable-next-line @angular-eslint/use-injectable-provided-in
@Injectable()
export class I18nInterceptor implements HttpInterceptor {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    /* Use the build locale as the language header, so the API can serve the same language  */
    return next.handle(request.clone({
      setHeaders: { 'Accept-Language': this.locale },
    }));

  }

}
