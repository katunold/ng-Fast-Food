import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from 'src/app/modules/feature/feature-routing.module';
import { NavBarComponent } from 'src/app/modules/feature/nav-bar/nav-bar.component';
import { MenuComponent } from 'src/app/modules/feature/menu/menu.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { PlaceOrderComponent } from 'src/app/modules/feature/place-order/place-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from 'src/app/modules/feature/orders/orders.component';
import { SingleOrderComponent } from 'src/app/modules/feature/single-order/single-order.component';
import { OrderHistoryComponent } from 'src/app/modules/feature/order-history/order-history.component';
import { AddMenuItemComponent } from 'src/app/modules/feature/add-menu-item/add-menu-item.component';
import { DeleteMenuItemComponent } from 'src/app/modules/feature/delete-menu-item/delete-menu-item.component';
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
