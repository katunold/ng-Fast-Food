import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from 'src/app/components/user-login/user-login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptorService } from 'src/app/services/interceptors/jwt/jwt.interceptor.service';
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
