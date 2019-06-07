import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBarComponent } from 'src/app/modules/shared/tool-bar/tool-bar.component';
import { SharedImports } from 'src/app/utils/test/shared-imports';
import { queryAllByCss } from 'src/app/utils/test/helpers';
import { currentUser } from 'src/app/utils/test/mock-data';

describe('ToolBarComponent', () => {
	let component: ToolBarComponent;
	let fixture: ComponentFixture<ToolBarComponent>;
	let placeOrder;
	let addMenuItem;
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [ ToolBarComponent ],
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(ToolBarComponent);
				component = fixture.componentInstance;
				component.rights = {logged_in_as: 'admin'};
				fixture.detectChanges();
			});
	}));

	beforeEach(() => {
		component.button_name = 'Place order';
		component.button_name1 = 'Add menu item';
		component.rights = currentUser;
		component.display = true;
		fixture.detectChanges();
		const [place_order, add_menu_item] = queryAllByCss(fixture, 'button')
			.map(debugElement => debugElement.nativeElement);
		placeOrder = place_order;
		addMenuItem = add_menu_item;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit event to display place order module', async (() => {
		const spy = spyOn(component.create, 'emit');
		placeOrder.click();

		fixture.whenStable().then(() => {
			expect(spy).toHaveBeenCalledTimes(1);
		});
	}));

	it('should emit event to display add menu item module', () => {
		const spy = spyOn(component.addMenu, 'emit');
		addMenuItem.click();

		fixture.whenStable().then(() => {
			expect(spy).toHaveBeenCalledTimes(1);
		});
	});
});
