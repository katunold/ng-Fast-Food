import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import {SharedImports} from 'src/app/utils/test/shared-imports';
import {authServiceSpy, httpServiceSpy, snackBarServiceSpy} from 'src/app/utils/test/spies';
import {of, throwError} from 'rxjs';
import {error_response, success_response} from 'src/app/utils/test/mock-data';
import {HttpService} from 'src/app/services/http/http.service';
import {SnackBarService} from 'src/app/services/snack-bar/snack-bar.service';
import {AuthService} from 'src/app/services/auth/auth.service';

fdescribe('NavBarComponent', () => {
	let component: NavBarComponent;
	let fixture: ComponentFixture<NavBarComponent>;
	let dummyNavBarComponent: NavBarComponent;
	let mockHttpService;
	let mockAuthService;
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		mockHttpService = {
			...httpServiceSpy,
			requests_to_backend: () => of(success_response),
		};
		mockAuthService = {
			...authServiceSpy,
			logout: () => {}
		};
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [ NavBarComponent ],
			providers: [
				{ provide: HttpService, useValue: mockHttpService},
				{ provide: AuthService, useValue: mockAuthService},
				{ provide: SnackBarService, useValue: snackBarServiceSpy},
			]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(NavBarComponent);
				component = fixture.componentInstance;
				component.userName = 'test';
				component.display = true;
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should successfully logout a user', () => {
		const spy = spyOn(component.authService, 'logout');
		component.onLogout();
		expect(spy).toHaveBeenCalled();
	});

	it('should display an error message on unsuccessful logout', () => {
		mockHttpService = {
			...httpServiceSpy,
			requests_to_backend: () => throwError(error_response),
		};
		mockAuthService = {
			...authServiceSpy,
			logout: () => {}
		};

		dummyNavBarComponent = new NavBarComponent(mockAuthService, mockHttpService, snackBarServiceSpy);
		dummyNavBarComponent.onLogout();
		expect(dummyNavBarComponent.snackBarService.displaySnackBar).toHaveBeenCalled();

	});
});
