import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	url = 'http://0.0.0.0:5000';

	constructor(
		private http: HttpClient
	) { }

	registerUser = (user: any) => {
		return this.http.post(`${this.url}/api/v1/auth/signup/`, user);
	}

	loginUser = (user: any) => {
		return this.http.post(`${this.url}/api/v1/auth/login/`, user);
	}
}
