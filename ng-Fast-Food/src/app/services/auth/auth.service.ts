import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthData } from 'src/app/models/auth-data';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	url = environment.base_url;
	private currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<any>;

	constructor(
		private http: HttpClient,
		private router: Router
	) {
		this.currentUserSubject = new BehaviorSubject<any>(
			JSON.parse(sessionStorage.getItem('currentUser'))
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): any {
		return this.currentUserSubject.value;
	}

	loginUser = (user: any) => {
		return this.http.post<AuthData>(`${this.url}/auth/login/`, user)
			.pipe(
				map(
					response => {
						if (response && response.auth_token) {
							sessionStorage.setItem('currentUser', JSON.stringify(response));
							this.currentUserSubject.next(response);
						}
						return response;
					}
				)
			);
	}

	logout = () => {
		// remove user from local storage to log user out
		sessionStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
		this.router.navigate(['login']);
	}
}
