import { AuthGuard } from './auth.guard';
import { routerSpy } from 'src/app/utils/test/spies';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
	let authGuard: AuthGuard;
	let authServiceMock;

	const setUp = (currentUserDataResponse: boolean) => {
		authServiceMock = {
			currentUserValue: currentUserDataResponse
		};
		authGuard = new AuthGuard(authServiceMock, routerSpy);
	};

	const guardResponse = (bool: boolean): boolean => {
		setUp(bool);
		const result = authGuard.canActivate( new ActivatedRouteSnapshot(), {
			url: 'testUrl',
		} as RouterStateSnapshot);
		return result as boolean;
	};

	it('should return true for canActivate', () => {
		expect(guardResponse(true)).toBeTruthy();
	});

	it('should return false for canActivate', () => {
		expect(guardResponse(false)).toBeFalsy();
	});
});
