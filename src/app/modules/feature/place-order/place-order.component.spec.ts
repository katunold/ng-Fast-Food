import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderComponent } from './place-order.component';
import {SharedImports} from 'src/app/utils/test/shared-imports';
import {httpServiceSpy, matDialogRefSpy, matDialogSpy, snackBarServiceSpy} from 'src/app/utils/test/spies';
import {of, throwError} from 'rxjs';
import {error_response, menuData, success_response} from 'src/app/utils/test/mock-data';
import {HttpService} from 'src/app/services/http/http.service';
import {SnackBarService} from 'src/app/services/snack-bar/snack-bar.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {queryByCss, triggerEvents} from 'src/app/utils/test/helpers';
import {FormBuilder} from '@angular/forms';

fdescribe('PlaceOrderComponent', () => {
	let component: PlaceOrderComponent;
	let formDe;
	let order_item;
	let special_notes;
	let dummyPlaceOrderComponent: PlaceOrderComponent;
	let fixture: ComponentFixture<PlaceOrderComponent>;
	let mockHttpService;
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		mockHttpService = {
			...httpServiceSpy,
			requests_to_backend: () => of(success_response),
		};
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [ PlaceOrderComponent ],
			providers: [
				{ provide: HttpService, useValue: mockHttpService},
				{ provide: SnackBarService, useValue: snackBarServiceSpy},
				{ provide: MatDialogRef, useValue: matDialogRefSpy },
				{ provide: MAT_DIALOG_DATA, useValue: matDialogSpy },
			],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents()
			. then(() => {
				fixture = TestBed.createComponent(PlaceOrderComponent);
				component = fixture.componentInstance;
				component.data = menuData.data;
				fixture.detectChanges();
			});
	}));

	beforeEach(() => {
		formDe = queryByCss(fixture, 'form');
		order_item = queryByCss(fixture, '.mat-select-trigger').nativeElement;
		special_notes = queryByCss(fixture, 'textarea').nativeElement;
		order_item.value = 'roasted beef';
		special_notes.value = 'Add some salt';
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should place order on click submit', () => {
		triggerEvents(formDe, 'submit', null);
		component.onSubmit();
		expect(component.snackBarService.displaySnackBar).toHaveBeenCalled();
	});

	it('should display error message incase request is not successful', () => {
		mockHttpService = {
			...httpServiceSpy,
			requests_to_backend: () => throwError(error_response),
		};
		const formBuilder = new FormBuilder();
		dummyPlaceOrderComponent = new PlaceOrderComponent(
			matDialogRefSpy, matDialogSpy, formBuilder, mockHttpService, snackBarServiceSpy);
		dummyPlaceOrderComponent.orderForm = formBuilder.group(
			{order_item: 'roasted beef', special_notes: 'Add some salt'});
		dummyPlaceOrderComponent.ngOnInit();
		dummyPlaceOrderComponent.onSubmit();
		expect(dummyPlaceOrderComponent.snackBarService.displaySnackBar).toHaveBeenCalled();
	});
});
