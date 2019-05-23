import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './menu/menu.component';
import { FeatureComponent } from './feature.component';
import { MaterialModule } from '../shared/material.module';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [NavBarComponent, MenuComponent, FeatureComponent, PlaceOrderComponent],
	imports: [
		CommonModule,
		FeatureRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
	],
	entryComponents: [
		PlaceOrderComponent
	]
})
export class FeatureModule { }
