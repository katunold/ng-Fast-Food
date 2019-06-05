import { TestBed } from '@angular/core/testing';

import { ErrorInterceptorService } from './error-interceptor.service';
import { authServiceSpy } from 'src/app/utils/test/spies';
import { AuthService } from 'src/app/services/auth/auth.service';
import { throwError } from 'rxjs';

fdescribe('ErrorInterceptorService', () => {
	let service;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ErrorInterceptorService,
				{ provide: AuthService, useValue: authServiceSpy },
			],
		});

		service = TestBed.get(ErrorInterceptorService);
	});

	it('intercepts error', () => {
		const spy = jasmine.createSpyObj('HttpHandler', ['handle']);
		const req = {};
		const error = { status: 401 };

		authServiceSpy.logout.and.returnValue(null);
		spy.handle.and.returnValue(throwError(error));

		service.intercept(req, spy).subscribe(() => {}, err => {});
	});
});
