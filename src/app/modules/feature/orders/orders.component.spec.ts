import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponent } from './orders.component';
import { SharedImports } from 'src/app/utils/test/shared-imports';
import { httpServiceSpy, matDialogSpy, snackBarServiceSpy } from 'src/app/utils/test/spies';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { emptyOrdersData, error_response, ordersData, success_response } from 'src/app/utils/test/mock-data';
import { HttpService } from 'src/app/services/http/http.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('OrdersComponent', () => {
	let component: OrdersComponent;
	let fixture: ComponentFixture<OrdersComponent>;
	let mockHttpService;
	let dummyOrdersComponent: OrdersComponent;
	const loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		mockHttpService = {
			...httpServiceSpy,
			loading,
			requests_to_backend: () => of(ordersData),
		};
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [ OrdersComponent ],
			providers: [
				{ provide: HttpService, useValue: mockHttpService},
				{ provide: SnackBarService, useValue: snackBarServiceSpy }
			],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(OrdersComponent);
				component = fixture.componentInstance;
				fixture.detectChanges();
			});
	}));


	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display an error message when something goes wrong while fetching the data',
		() => {
			mockHttpService = {
				...httpServiceSpy,
				loading,
				requests_to_backend: () => throwError(error_response),
			};
			dummyOrdersComponent = new OrdersComponent(mockHttpService, snackBarServiceSpy, matDialogSpy);
			dummyOrdersComponent.ngOnInit();
			expect(dummyOrdersComponent.snackBarService.displaySnackBar).toHaveBeenCalled();
		}
	);

	it('should display no orders available', () => {
		mockHttpService = {
			...httpServiceSpy,
			loading,
			requests_to_backend: () => of(emptyOrdersData),
		};
		dummyOrdersComponent = new OrdersComponent(mockHttpService, snackBarServiceSpy, matDialogSpy);
		dummyOrdersComponent.ngOnInit();
		expect(dummyOrdersComponent.snackBarService.displaySnackBar).toHaveBeenCalled();
	});

	it('should display detailed data of a single order', () => {
		const spy = spyOn(component, 'openDialog');
		component.orders$.next(ordersData.data);
		component.singleOrder(21);
		expect(spy).toHaveBeenCalled();
	});

	it('should open module to display single order details', () => {
		const spy = spyOn(component.dialog, 'open');
		component.single_order = ordersData.data[1];
		component.openDialog();
		expect(spy).toHaveBeenCalled();
	});

	it('should update the status of an order', () => {
		mockHttpService = {
			...httpServiceSpy,
			loading,
			requests_to_backend: () => of(success_response),
		};
		dummyOrdersComponent = new OrdersComponent(mockHttpService, snackBarServiceSpy, matDialogSpy);
		dummyOrdersComponent.selected({data: {value: 'Processing'}, id: 40});
		expect(dummyOrdersComponent.snackBarService.displaySnackBar).toHaveBeenCalled();
	});

	it('should display error message on failure to update', () => {
		mockHttpService = {
			...httpServiceSpy,
			loading,
			requests_to_backend: () => throwError(error_response),
		};
		dummyOrdersComponent = new OrdersComponent(mockHttpService, snackBarServiceSpy, matDialogSpy);
		dummyOrdersComponent.selected({data: {value: 'Processing'}, id: 40});
		expect(dummyOrdersComponent.snackBarService.displaySnackBar).toHaveBeenCalled();
	});

});
