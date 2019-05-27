import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './menu/menu.component';
import { FeatureComponent } from './feature.component';
import { MaterialModule } from '../shared/material.module';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptorService } from 'src/app/services/interceptors/error/error-interceptor.service';
import { OrdersComponent } from './orders/orders.component';
import { SingleOrderComponent } from './single-order/single-order.component';

@NgModule({
	declarations: [
		NavBarComponent,
		MenuComponent,
		FeatureComponent,
		PlaceOrderComponent,
		OrdersComponent,
		SingleOrderComponent],
	imports: [
		CommonModule,
		FeatureRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
	],
	entryComponents: [
		PlaceOrderComponent,
		SingleOrderComponent
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptorService,
			multi: true,
		}
	],
})
export class FeatureModule { }
