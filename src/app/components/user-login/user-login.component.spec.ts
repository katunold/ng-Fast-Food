import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import { Router } from '@angular/router';
import { SharedImports } from 'src/app/utils/test/shared-imports';
import { AuthService } from 'src/app/services/auth/auth.service';
import { authServiceSpy, snackBarServiceSpy } from 'src/app/utils/test/spies';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { queryAllByCss, queryByCss, triggerEvents } from 'src/app/utils/test/helpers';
import { noop, of, throwError } from 'rxjs';
import { error_response } from 'src/app/utils/test/mock-data';

describe('UserLoginComponent', () => {
	let component: UserLoginComponent;
	let fixture: ComponentFixture<UserLoginComponent>;
	let router;
	let routerSpy;
	let formDe;
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [ UserLoginComponent ],
			providers: [
				{ provide: AuthService, useValue: authServiceSpy },
				{ provide: SnackBarService, useValue: snackBarServiceSpy }
			]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(UserLoginComponent);
				component = fixture.componentInstance;
				router = TestBed.get(Router);
				routerSpy = spyOn(router, 'navigate');
				routerSpy.and.returnValue('null');
				fixture.detectChanges();
			});
	}));

	beforeEach(() => {
		formDe = queryByCss(fixture, 'form');
		const [user_name, password] = queryAllByCss(fixture, 'input')
			.map( debugElement => debugElement.nativeElement);
		user_name.value = 'arnold';
		password.value = 'test-password';
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should submit login form on click login', () => {
		const spy = spyOn(component, 'onLogin');
		triggerEvents(formDe, 'submit', null);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should successfully login a user', () => {
		authServiceSpy.loginUser.and.returnValue(of({}));
		triggerEvents(formDe, 'submit', null);
		component.onLogin();
		expect(component.loading).toBe(false);
	});

	it('should throw an error on unsuccessful login', () => {
		authServiceSpy.loginUser.and.returnValue(throwError(error_response));
		triggerEvents(formDe, 'submit', null);
		component.onLogin();
		expect(snackBarServiceSpy.displaySnackBar).toHaveBeenCalledWith(
			'Please check your network connection', 'error-snackbar');
	});

});
