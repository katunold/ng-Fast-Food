import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { SharedImports } from 'src/app/utils/test/shared-imports';
import { HttpService } from 'src/app/services/http/http.service';
import { httpServiceSpy, matDialogSpy, snackBarServiceSpy } from 'src/app/utils/test/spies';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject, EMPTY, of, throwError } from 'rxjs';
import { emptyMenuData, error_response, menuData } from 'src/app/utils/test/mock-data';

describe('MenuComponent', () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;
	let httpServiceMock;
	let dummyMenuComponent: MenuComponent;
	const loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	const menu_items: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		httpServiceMock = {
			...httpServiceSpy,
			requests_to_backend: () => of(menuData),
			loading,
			menu_items,
		};
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [ MenuComponent ],
			providers: [
				{ provide: HttpService, useValue: httpServiceMock}
			],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(MenuComponent);
				component = fixture.componentInstance;
				component.rights = {logged_in_as: 'admin'};
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display an error message when something goes wrong', () => {
		httpServiceMock = {
			...httpServiceSpy,
			requests_to_backend: () => throwError(error_response),
			loading,
			menu_items,
		};
		dummyMenuComponent = new MenuComponent(httpServiceMock, matDialogSpy, snackBarServiceSpy);
		dummyMenuComponent.ngOnInit();
		expect(dummyMenuComponent.snackBarService.displaySnackBar).toHaveBeenCalled();
	});

	it('should display no menu data currently to display snackbar', () => {
		httpServiceMock = {
			...httpServiceSpy,
			requests_to_backend: () => of(emptyMenuData),
			loading,
			menu_items,
		};
		dummyMenuComponent = new MenuComponent(httpServiceMock, matDialogSpy, snackBarServiceSpy);
		dummyMenuComponent.ngOnInit();
		expect(dummyMenuComponent.snackBarService.displaySnackBar).toHaveBeenCalled();
	});

	it('should open the place order module', () => {
		const spy = spyOn(component.dialog, 'open');
		component.menu_items = menuData.data;
		component.openDialog();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should open the add menu item module', () => {
		const spy = spyOn(component.dialog, 'open').and.returnValue(
			{afterClosed: () => EMPTY});
		component.openAddMenuDialog();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should open the delete menu item dialog', () => {
		const spy = spyOn(component.dialog, 'open').and.returnValue(
			{afterClosed: () => EMPTY}
		);
		component.openDeleteDialog(9, 'roasted pork');
		expect(spy).toHaveBeenCalledTimes(1);
	});

});
