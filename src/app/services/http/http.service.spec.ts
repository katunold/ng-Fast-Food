import { inject, TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { SharedImports } from 'src/app/utils/test/shared-imports';
import { HttpTestingController } from '@angular/common/http/testing';
import { registrationData } from 'src/app/utils/test/mock-data';
import { environment } from 'src/environments/environment';

fdescribe('HttpService', () => {
	let service: HttpService;
	let httpMock: HttpTestingController;
	const url = environment.base_url;
	const sharedImports = new SharedImports();
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()]
		});
		service = TestBed.get(HttpService);
		httpMock = TestBed.get(HttpTestingController);
	});

	afterEach(inject(
		[HttpTestingController],
		(backend: HttpTestingController) => {
			backend.verify();
		}));

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should send a sign up request', () => {
		const endpoint = '/auth/signup/';
		service.requests_to_backend(endpoint, 'post', registrationData).subscribe();

		const request = httpMock.expectOne(
			url + endpoint,
			'request to sign up to the system'
		);
		expect(request.request.method).toBe('POST');
	});

	it('should send a request to delete menu item', () => {
		const endpoint = '/menu/2';
		service.requests_to_backend(endpoint, 'delete').subscribe();

		const request = httpMock.expectOne(
			url + endpoint,
			'request to delete a menu item with id 2'
		);
		expect(request.request.method).toBe('DELETE');
	});
});
