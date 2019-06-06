import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuItemComponent } from './add-menu-item.component';
import {SharedImports} from 'src/app/utils/test/shared-imports';
import {HttpService} from 'src/app/services/http/http.service';
import {httpServiceSpy, matDialogRefSpy, snackBarServiceSpy} from 'src/app/utils/test/spies';
import {SnackBarService} from 'src/app/services/snack-bar/snack-bar.service';
import {MatDialogRef} from '@angular/material';
import {queryAllByCss, queryByCss, triggerEvents} from 'src/app/utils/test/helpers';
import {of, throwError} from 'rxjs';
import {error_response, success_response} from 'src/app/utils/test/mock-data';
import {FormBuilder} from '@angular/forms';

fdescribe('AddMenuItemComponent', () => {
	let component: AddMenuItemComponent;
	let fixture: ComponentFixture<AddMenuItemComponent>;
	let dummyAddMenuItemComponent: AddMenuItemComponent;
	let mockHttpService;
	let formDe;
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		mockHttpService = {
			...httpServiceSpy,
			requests_to_backend: () => of(success_response),
		};
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [ AddMenuItemComponent ],
			providers: [
				{ provide: HttpService, useValue: mockHttpService},
				{ provide: SnackBarService, useValue: snackBarServiceSpy},
				{ provide: MatDialogRef, useValue: matDialogRefSpy },
			]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(AddMenuItemComponent);
				component = fixture.componentInstance;
				fixture.detectChanges();
			});
	}));

	beforeEach(() => {
		formDe = queryByCss(fixture, 'form');
		const [food_item, price] = queryAllByCss(fixture, 'input')
			.map( debugElement => debugElement.nativeElement);
		food_item.value = 'boiled maize';
		price.value = '1500';
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should add new menu item onclick submit', () => {
		triggerEvents(formDe, 'submit', null);
		component.onSubmit();
		expect(component.snackBarService.displaySnackBar).toHaveBeenCalled();
	});

	it('should display error message when request is not successful', () => {
		mockHttpService = {
			...httpServiceSpy,
			requests_to_backend: () => throwError(error_response),
		};
		const formBuilder = new FormBuilder();
		dummyAddMenuItemComponent = new AddMenuItemComponent(matDialogRefSpy, formBuilder, mockHttpService, snackBarServiceSpy);
		dummyAddMenuItemComponent.menuItemForm = formBuilder.group({food_item: 'boiled maize', price: '1500'});
		dummyAddMenuItemComponent.ngOnInit();
		dummyAddMenuItemComponent.onSubmit();
		expect(dummyAddMenuItemComponent.snackBarService.displaySnackBar).toHaveBeenCalled();
	});
});
