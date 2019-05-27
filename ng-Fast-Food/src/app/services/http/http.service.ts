import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	url = environment.base_url;
	public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	public menu_items: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

	constructor(
		private http: HttpClient
	) { }

	postData = (endpoint: string, data: any) => {
		return this.http.post<any>(this.url + endpoint, data);
	}

	updateData = (endpoint: string, data: any) => {
		return this.http.put<any>(this.url + endpoint, data);
	}

	getData = (endpoint: string) => {
		return this.http.get<any>(this.url + endpoint);
	}

}
