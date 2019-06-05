import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryComponent } from './order-history.component';
import { SharedImports } from 'src/app/utils/test/shared-imports';
import { httpServiceSpy, matDialogSpy, snackBarServiceSpy } from 'src/app/utils/test/spies';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { emptyOrdersData, error_response, ordersHistory } from 'src/app/utils/test/mock-data';
import { HttpService } from 'src/app/services/http/http.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('OrderHistoryComponent', () => {
	let component: OrderHistoryComponent;
	let fixture: ComponentFixture<OrderHistoryComponent>;
	let dummyOrderHistoryComponent: OrderHistoryComponent;
	let mockHttpService;
	const loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		mockHttpService = {
			...httpServiceSpy,
			requests_to_backend: () => of(ordersHistory),
			loading
		};
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [ OrderHistoryComponent ],
			providers: [
				{ provide: HttpService, useValue: mockHttpService},
				{ provide: SnackBarService, useValue: httpServiceSpy}
			],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(OrderHistoryComponent);
				component = fixture.componentInstance;
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display error message when order history fails', () => {
		mockHttpService = {
			...httpServiceSpy,
			requests_to_backend: () => throwError(error_response),
			loading
		};
		dummyOrderHistoryComponent = new OrderHistoryComponent(
			mockHttpService, snackBarServiceSpy, matDialogSpy);
		dummyOrderHistoryComponent.ngOnInit();
		expect(dummyOrderHistoryComponent.snackBarService.displaySnackBar)
			.toHaveBeenCalledWith(
				'Please check your network connection',
				'error-snackbar'
				);
	});

	it('should display no order history snackbar', () => {
		mockHttpService = {
			...httpServiceSpy,
			requests_to_backend: () => of(emptyOrdersData),
			loading
		};
		dummyOrderHistoryComponent = new OrderHistoryComponent(
			mockHttpService, snackBarServiceSpy, matDialogSpy);
		dummyOrderHistoryComponent.ngOnInit();
		expect(dummyOrderHistoryComponent.snackBarService.displaySnackBar)
			.toHaveBeenCalledWith(
				'No Orders placed so far',
				'warning-snackbar'
			);
	});

	it('should display details of a single order', () => {
		const spy = spyOn(component.dialog, 'open');
		component.selected(ordersHistory.data[2]);
		expect(spy).toHaveBeenCalled();
	});

});
