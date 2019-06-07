import { JwtInterceptorService } from 'src/app/services/interceptors/jwt/jwt.interceptor.service';
import { httpHandlerSpy } from 'src/app/utils/test/spies';
import { of } from 'rxjs';

describe('JwtInterceptorService', () => {
	let service;
	let spy;
	let req;
	let mockAuthService;
	let authServiceData;
	authServiceData = {
		currentUserValue: {
			auth_token: '2e12swqdq32rtgwfefser43refrefref4re23122312e'
		}
	};

	const setUp = (authService: any) => {
		mockAuthService = authService;
		spy = httpHandlerSpy;
		service = new JwtInterceptorService(mockAuthService);
	};

	it('should be created', () => {
		setUp(authServiceData);
		expect(service).toBeTruthy();
	});

	it('should intercept request with a currentUser', () => {
		setUp(authServiceData);
		req = {
			clone: jasmine.createSpy('clone'),
		};
		spy.handle.and.returnValue(of());
		service.intercept(req, spy).subscribe();
		expect(req.clone).toHaveBeenCalledTimes(1);
	});

	it('should intercept request with no current user', () => {
		setUp({});
		req = {
			clone: jasmine.createSpy('clone'),
		};
		spy.handle.and.returnValue(of());
		service.intercept(req, spy).subscribe();
		expect(req.clone).toHaveBeenCalledTimes(1);
	});

});
