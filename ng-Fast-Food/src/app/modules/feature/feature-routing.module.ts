import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
// import { FeatureComponent } from './feature.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OrdersComponent } from 'src/app/modules/feature/orders/orders.component';

const routes: Routes = [
	{
		path: '',
		component: NavBarComponent,
		children: [
			{ path: 'menu', component: MenuComponent },
			{ path: 'orders', component: OrdersComponent},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FeatureRoutingModule { }
