import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Validations } from '../../utils/validations';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
	registrationForm: FormGroup;
	usernameErrorMessage: string;
	emailErrorMessage: string;
	passwordErrorMessage: string;
	confirmPasswordErrorMessage: string;
	validations = new Validations();

	hide = true;

	constructor(
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.registrationForm = this.fb.group({
			user_name: ['', [Validators.required, Validators.minLength(4)]],
			email: ['', [Validators.required, Validators.email]],
			contact: ['', [Validators.required]],
			user_type: 'client',
			passwordGroup: this.fb.group({
				password: ['', [Validators.required, Validators.minLength(6)]],
				confirmPassword: ['', [Validators.required]]
			}, {validator: this.validations.passwordMatch})
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

		const passwordControl = this.registrationForm.get('passwordGroup.password');
		passwordControl.valueChanges.pipe(
			debounceTime(1000)
		).subscribe(
			() => this.setPasswordErrorMessage(passwordControl)
		);

		const confirmPasswordControl = this.registrationForm.get('passwordGroup');
		confirmPasswordControl.valueChanges.pipe(
			debounceTime(1000)
		).subscribe(
			() => this.setConfirmPasswordErrorMessage(confirmPasswordControl)
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

	public setPasswordErrorMessage(c: AbstractControl): void {
		this.passwordErrorMessage = '';
		if ((c.touched || c.dirty) && c.errors) {
			this.passwordErrorMessage = Object.keys(c.errors).map(
				key => this.passwordErrorMessage += this.validations.passwordInputErrorMessages[key]
			).join(' ');
		}
	}

	public setConfirmPasswordErrorMessage(c: AbstractControl): void {
		this.confirmPasswordErrorMessage = '';
		console.log(c.errors);
		if ((c.touched || c.dirty) && c.errors) {
			this.confirmPasswordErrorMessage = Object.keys(c.errors).map(
				key => this.validations.passwordInputErrorMessages[key]
			).join(' ');
		}
	}
}
