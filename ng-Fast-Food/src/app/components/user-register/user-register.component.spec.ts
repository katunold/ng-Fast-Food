import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserRegisterComponent } from './user-register.component';
import { SharedImports } from '../../utils/test/shared-imports';
import { HttpService } from '../../services/http/http.service';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';

fdescribe('UserRegisterComponent', () => {
	let component: UserRegisterComponent;
	let fixture: ComponentFixture<UserRegisterComponent>;
	let router;
	let routerSpy;
	let mockHttpService;
	let formDe;
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		mockHttpService = jasmine.createSpyObj('HttpService', ['postData']);
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [UserRegisterComponent],
			providers: [
				{ provide: HttpService, useValue: mockHttpService }
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
			fixture.debugElement.queryAll(By.css('input'))
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

	it('should set loading to true onSubmit', () => {
		formDe.triggerEventHandler('submit', null);
		expect(component.loading).toBeTruthy();
	});

	it('should submit data on successful sign up', () => {
		const spy = spyOn(component, 'onSubmit');
		mockHttpService.postData.and.returnValue(of({}));
		formDe.triggerEventHandler('submit', null);
		expect(spy).toHaveBeenCalledTimes(1);
	});

});
