import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from 'src/app/modules/feature/menu/menu.component';
import { NavBarComponent } from 'src/app/modules/feature/nav-bar/nav-bar.component';
import { OrdersComponent } from 'src/app/modules/feature/orders/orders.component';
import { OrderHistoryComponent } from 'src/app/modules/feature/order-history/order-history.component';

const routes: Routes = [
	{
		path: '',
		component: NavBarComponent,
		children: [
			{ path: 'menu', component: MenuComponent },
			{ path: 'orders', component: OrdersComponent},
			{ path: 'order-history', component: OrderHistoryComponent}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FeatureRoutingModule { }
