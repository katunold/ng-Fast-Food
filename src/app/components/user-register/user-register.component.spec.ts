import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { SharedImports } from 'src/app/utils/test/shared-imports';
import { HttpService } from 'src/app/services/http/http.service';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { httpServiceSpy, snackBarServiceSpy } from 'src/app/utils/test/spies';
import { queryAllByCss, triggerEvents } from 'src/app/utils/test/helpers';
import { error_response } from 'src/app/utils/test/mock-data';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

describe('UserRegisterComponent', () => {
	let component: UserRegisterComponent;
	let fixture: ComponentFixture<UserRegisterComponent>;
	let router;
	let routerSpy;
	let formDe;
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [UserRegisterComponent],
			providers: [
				{ provide: HttpService, useValue: httpServiceSpy },
				{ provide: SnackBarService, useValue: snackBarServiceSpy }
			]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(UserRegisterComponent);
				component = fixture.componentInstance;
				router = TestBed.get(Router);
				routerSpy = spyOn(router, 'navigate');
				routerSpy.and.returnValue('null');
				fixture.detectChanges();
			});
	}));

	beforeEach(() => {
		formDe = fixture.debugElement.query(By.css('form'));
		const [userName, email, contact, password] =
			queryAllByCss(fixture, 'input')
				.map(debugElement => debugElement.nativeElement);
		userName.value = 'Arnold';
		email.value = 'test@mail.com';
		contact.value = '0706180670';
		password.value = '1qaz2wsx';
	});

	it('should validate length of username', fakeAsync(() => {
			const inputElement = fixture.nativeElement.querySelector('#user_name');
			inputElement.value = 'Ar';
			inputElement.dispatchEvent(new Event('input'));
			fixture.detectChanges();
			tick(1000);
			fixture.whenStable().then(() => {
				expect(component.usernameErrorMessage).toBe('This field should have at-least 4 characters');
			});
		})
	);

	it('should validate email input field', fakeAsync(() => {
		const inputElement = fixture.nativeElement.querySelector('#email');
		inputElement.value = 'arnold';
		inputElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		tick(1000);
		fixture.whenStable().then(() => {
			expect(component.emailErrorMessage).toBe('Invalid email format');
		});
	}));

	it('should validate contact field', fakeAsync(() => {
		const inputElement = fixture.nativeElement.querySelector('#contact');
		inputElement.value = '0706145';
		inputElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		tick(1000);
		fixture.whenStable().then(() => {
			expect(component.contactErrorMessage).toBe('Invalid contact format, ' +
				'please enter a value with this format +25670000000');
		});
	}));

	it('should return null when the correct contact format is submitted',
		fakeAsync(() => {
		const inputElement = fixture.nativeElement.querySelector('#contact');
		inputElement.value = '0706180670';
		inputElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		tick(1000);
		fixture.whenStable().then(() => {
			expect(component.contactErrorMessage).toBe('');
		});
	}));

	it('should validate password field', fakeAsync(() => {
		const inputElement = fixture.nativeElement.querySelector('#password');
		inputElement.value = '1qaz';
		inputElement.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		tick(1000);
		fixture.whenStable().then(() => {
			expect(component.passwordErrorMessage).toBe('This field should have at-least 6 characters');
		});
	}));

	it('should submit data on successful sign up', () => {
		const spy = spyOn(component, 'onSubmit');
		triggerEvents(formDe, 'submit', null);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should set loading to false on successful login', () => {
		httpServiceSpy.requests_to_backend.and.returnValue(of({}));
		formDe.triggerEventHandler('submit', null);
		component.onSubmit();
		expect(component.loading).toBe(false);
	});

	it('should throw an error on unsuccessful sign-up', () => {
		httpServiceSpy.requests_to_backend.and.returnValue(throwError(error_response));
		triggerEvents(formDe, 'submit', null);
		component.onSubmit();
		expect(snackBarServiceSpy.displaySnackBar).toHaveBeenCalledWith(
			'Please check your network connection', 'error-snackbar');
	});

});
