import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../shared/material.module';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { SingleOrderComponent } from './single-order/single-order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AddMenuItemComponent } from './add-menu-item/add-menu-item.component';
import { DeleteMenuItemComponent } from './delete-menu-item/delete-menu-item.component';
import { ToolBarComponent } from 'src/app/modules/shared/tool-bar/tool-bar.component';

@NgModule({
	declarations: [
		NavBarComponent,
		MenuComponent,
		PlaceOrderComponent,
		OrdersComponent,
		SingleOrderComponent,
		OrderHistoryComponent,
		AddMenuItemComponent,
		ToolBarComponent,
		DeleteMenuItemComponent],
	imports: [
		CommonModule,
		FeatureRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
	],
	entryComponents: [
		PlaceOrderComponent,
		SingleOrderComponent,
		AddMenuItemComponent,
		DeleteMenuItemComponent
	]
})
export class FeatureModule { }
