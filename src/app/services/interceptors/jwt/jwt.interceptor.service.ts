import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

	constructor(
		private authService: AuthService
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add authorization header with jwt token if available
		const currentUser = this.authService.currentUserValue;
		if (currentUser && currentUser.auth_token) {
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUser.auth_token}`
				}
			});
		} else {
			req = req.clone({});
		}
		return next.handle(req);
	}
}
