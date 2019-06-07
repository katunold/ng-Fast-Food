import { TestBed } from '@angular/core/testing';

import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedImports } from 'src/app/utils/test/shared-imports';
import { authResponse, loginData } from 'src/app/utils/test/mock-data';
import { HttpClient } from '@angular/common/http';
import {httpClientSpy, routerSpy} from 'src/app/utils/test/spies';
import { of } from 'rxjs';
import {Router} from '@angular/router';

describe('AuthService', () => {
	let service: AuthService;
	const sharedImports = new SharedImports();
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			providers: [
				{ provide: HttpClient, useValue: httpClientSpy},
				{provide: Router, useValue: routerSpy}
			]
		});
		service = TestBed.get(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return an access token', () => {
		httpClientSpy.post.and.returnValue(of(authResponse));
		service.loginUser(loginData).subscribe(
			value => {
				expect(value.auth_token).toEqual('tdfjyettdkueiyrqlhdwjuya4egyuhjdveghafd52');
			}
		);
	});

	it('should logout current user', () => {
		const spy = spyOn(sessionStorage, 'removeItem');
		service.logout();
		expect(spy).toHaveBeenCalledWith('currentUser');
	});

});
