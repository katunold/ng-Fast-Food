import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './menu/menu.component';
import { FeatureComponent } from './feature.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
	declarations: [NavBarComponent, MenuComponent, FeatureComponent],
	imports: [
		CommonModule,
		FeatureRoutingModule,
		MaterialModule,
	],
})
export class FeatureModule { }
