import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { MaterialModule } from './modules/shared/material.module';

// @ts-ignore
@NgModule({
	declarations: [AppComponent, UserRegisterComponent],
	imports: [BrowserModule, MaterialModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
