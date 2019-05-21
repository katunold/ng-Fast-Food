import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configurations } from '../../utils/config';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	url = configurations.base_url;

	constructor(
		private http: HttpClient
	) { }

	registerUser = (user: any) => {
		return this.http.post(`${this.url}/api/v1/auth/signup/`, user);
	}

}
