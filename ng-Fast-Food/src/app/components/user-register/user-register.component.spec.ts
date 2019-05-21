import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterComponent } from './user-register.component';
import { SharedImports } from '../../utils/test/shared-imports';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../services/http/http.service';

describe('UserRegisterComponent', () => {
	let component: UserRegisterComponent;
	let fixture: ComponentFixture<UserRegisterComponent>;
	let mockFormBuilder: FormBuilder;
	let mockHttpService: HttpService;
	const sharedImports = new SharedImports();

	beforeEach(async(() => {
		mockFormBuilder = jasmine.createSpyObj('FormBuilder', ['group']);
		mockHttpService = jasmine.createSpyObj('HttpService', ['registerUser']);
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()],
			declarations: [UserRegisterComponent],
			providers: [
				{ provide: FormBuilder, useValue: mockFormBuilder },
				{ provide: HttpService, useValue: mockHttpService }
			]
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(UserRegisterComponent);
				component = fixture.componentInstance;
				component.registrationForm = mockFormBuilder.group({});
				fixture.detectChanges();
				console.log(component);
			});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

});
