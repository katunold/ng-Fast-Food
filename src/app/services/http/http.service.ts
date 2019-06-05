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

	requests_to_backend = (endpoint: string, method: any, data?: any) => {
		return data
			? this.http[method]<any>(this.url + endpoint, data)
			: this.http[method]<any>(this.url + endpoint);
	}
}
