import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from 'src/app/modules/shared/spinner/spinner.component';

describe('SpinnerComponent', () => {
	let component: SpinnerComponent;
	let fixture: ComponentFixture<SpinnerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SpinnerComponent ]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(SpinnerComponent);
				component = fixture.componentInstance;
				fixture.detectChanges();
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
