import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

export class SharedImports {
	getSharedImports = () => (
		[
			BrowserModule,
			BrowserAnimationsModule,
			FormsModule,
			ReactiveFormsModule,
			MaterialModule,
			FlexLayoutModule,
			HttpClientTestingModule,
			RouterTestingModule.withRoutes([])
		]
	)
}
