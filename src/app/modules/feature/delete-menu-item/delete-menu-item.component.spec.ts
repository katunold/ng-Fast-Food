import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMenuItemComponent } from './delete-menu-item.component';
import {SharedImports} from 'src/app/utils/test/shared-imports';
import {httpServiceSpy, matDialogRefSpy, matDialogSpy, snackBarServiceSpy} from 'src/app/utils/test/spies';
import {of, throwError} from 'rxjs';
import {error_response, menuData } from 'src/app/utils/test/mock-data';
import {HttpService} from 'src/app/services/http/http.service';
import {SnackBarService} from 'src/app/services/snack-bar/snack-bar.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

fdescribe('DeleteMenuItemComponent', () => {
	let component: DeleteMenuItemComponent;
	let fixture: ComponentFixture<DeleteMenuItemComponent>;
	let mockHttpService;
	let dummyDeleteMenuItemComponent: DeleteMenuItemComponent;
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		mockHttpService = {
			...httpServiceSpy,
			requests_to_backend: () => of({}),
		};

		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [ DeleteMenuItemComponent ],
			providers: [
				{ provide: HttpService, useValue: mockHttpService },
				{ provide: SnackBarService, useValue: snackBarServiceSpy },
				{ provide: MatDialogRef, useValue: matDialogRefSpy },
				{ provide: MAT_DIALOG_DATA, useValue: matDialogSpy },
			]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(DeleteMenuItemComponent);
				component = fixture.componentInstance;
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call delete method', () => {
		component.onDelete(menuData.data[3]);
		expect(component.snackBarService.displaySnackBar).toHaveBeenCalled();
	});

	it('should throw an error when the request is unsuccessful', () => {
		mockHttpService = {
			...httpServiceSpy,
			requests_to_backend: () => throwError(error_response),
		};
		dummyDeleteMenuItemComponent = new DeleteMenuItemComponent(
			matDialogRefSpy, matDialogSpy, mockHttpService, snackBarServiceSpy);
		dummyDeleteMenuItemComponent.onDelete(menuData.data[3]);
		expect(dummyDeleteMenuItemComponent.snackBarService.displaySnackBar).toHaveBeenCalledWith(
			'Please check your network connection', 'error-snackbar'
		);
	});
});
