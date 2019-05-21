import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

export class SharedImports {
	getSharedImports = () => (
		[
			BrowserModule,
			BrowserAnimationsModule,
			FormsModule,
			ReactiveFormsModule,
			MaterialModule,
			FlexLayoutModule,
			HttpClientModule,
			RouterTestingModule.withRoutes([])
		]
	)
}
