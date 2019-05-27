import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { MaterialModule } from './modules/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptorService } from './services/interceptors/jwt/jwt.interceptor.service';
import { ErrorInterceptorService } from 'src/app/services/interceptors/error/error-interceptor.service';

@NgModule({
	declarations: [AppComponent, UserRegisterComponent, UserLoginComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptorService,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptorService,
			multi: true,
		}
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
