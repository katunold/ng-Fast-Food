import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configurations } from '../../utils/config';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthData } from '../../models/auth-data';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	url = configurations.base_url;
	private currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<any>;

	constructor(
		private http: HttpClient
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
		return this.http.post<AuthData>(`${this.url}/api/v1/auth/login/`, user)
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
	}
}
