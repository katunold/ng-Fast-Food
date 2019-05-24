import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

	constructor(
		private authService: AuthService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError(
				err => {
					if (err.status === 401) {
						// auto logout if 401 response returned from api
						this.authService.logout();
					}
					return throwError(err);
				}
			)
		);
	}
}
