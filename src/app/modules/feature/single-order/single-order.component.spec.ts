import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOrderComponent } from './single-order.component';
import {SharedImports} from 'src/app/utils/test/shared-imports';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {matDialogRefSpy, matDialogSpy} from 'src/app/utils/test/spies';
import {ordersData} from 'src/app/utils/test/mock-data';

describe('SingleOrderComponent', () => {
	let component: SingleOrderComponent;
	let fixture: ComponentFixture<SingleOrderComponent>;
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [ SingleOrderComponent ],
			providers: [
				{ provide: MatDialogRef, useValue: matDialogRefSpy },
				{ provide: MAT_DIALOG_DATA, useValue: matDialogSpy },
			]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(SingleOrderComponent);
				component = fixture.componentInstance;
				component.data = ordersData.data[1];
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
