import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, first } from 'rxjs/operators';
import { Validations } from '../../utils/validations';
import { HttpService } from '../../services/http/http.service';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
	registrationForm: FormGroup;
	usernameErrorMessage: string;
	emailErrorMessage: string;
	contactErrorMessage: string;
	passwordErrorMessage: string;
	validations = new Validations();

	hide = true;

	constructor(
		private fb: FormBuilder,
		private http: HttpService
	) {}

	ngOnInit() {
		this.registrationForm = this.fb.group({
			user_name: ['', [Validators.required, Validators.minLength(4)]],
			email: ['', [Validators.required, Validators.email]],
			contact: ['', [Validators.required, this.validations.validateContact]],
			user_type: 'client',
			password: ['', [Validators.required, Validators.minLength(6)]]
		});

		const userNameControl = this.registrationForm.get('user_name');
		userNameControl.valueChanges.pipe(
			debounceTime(1000)
		).subscribe(
			() => this.setUserNameErrorMessage(userNameControl)
		);

		const emailControl = this.registrationForm.get('email');
		emailControl.valueChanges.pipe(
			debounceTime(1000)
		).subscribe(
			() => this.setEmailErrorMessage(emailControl)
		);

		const contactControl = this.registrationForm.get('contact');
		contactControl.valueChanges.pipe(
			debounceTime(1000)
		).subscribe(
			() => this.setContactErrorMessage(contactControl)
		);

		const passwordControl = this.registrationForm.get('password');
		passwordControl.valueChanges.pipe(
			debounceTime(1000)
		).subscribe(
			() => this.setPasswordErrorMessage(passwordControl)
		);
	}

	public setUserNameErrorMessage(c: AbstractControl): void {
		this.usernameErrorMessage = '';
		if ((c.touched || c.dirty) && c.errors) {
			this.usernameErrorMessage = Object.keys(c.errors).map(
				key => this.usernameErrorMessage += this.validations.textInputErrorMessages[key]
			).join(' ');
		}
	}

	public setEmailErrorMessage(c: AbstractControl): void {
		this.emailErrorMessage = '';
		if ((c.touched || c.dirty) && c.errors) {
			this.emailErrorMessage = Object.keys(c.errors).map(
				key => this.emailErrorMessage += this.validations.textInputErrorMessages[key]
			).join(' ');
		}
	}

	public setContactErrorMessage(c: AbstractControl): void {
		this.contactErrorMessage = '';
		if ((c.touched || c.dirty) && c.errors) {
			this.contactErrorMessage = Object.keys(c.errors).map(
				key => this.contactErrorMessage
					+= this.validations.textInputErrorMessages[key]
			).join(' ');
		}
	}

	public setPasswordErrorMessage(c: AbstractControl): void {
		this.passwordErrorMessage = '';
		if ((c.touched || c.dirty) && c.errors) {
			this.passwordErrorMessage = Object.keys(c.errors).map(
				key => this.passwordErrorMessage
					+= this.validations.passwordInputErrorMessages[key]
			).join(' ');
		}
	}

	onSubmit = () => {
		const registration = this.registrationForm;
		const registrationData = {
			user_name: registration.get('user_name').value,
			email: registration.get('email').value,
			contact: registration.get('contact').value,
			user_type: registration.get('user_type').value,
			password: registration.get('password').value,
		};
		this.http.registerUser(registrationData)
			.pipe(first())
			.subscribe(
				data => console.log(data),
				error => console.log(error)
			);
	}
}
