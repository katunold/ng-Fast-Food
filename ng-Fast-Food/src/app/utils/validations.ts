import { AbstractControl } from '@angular/forms';

export class Validations {

	public textInputErrorMessages = {
		required: 'This field is required',
		minlength: 'This field should have at-least 4 characters',
		email: 'Invalid email format'
	};

	public passwordInputErrorMessages = {
		required: 'This field is required',
		minlength: 'This field should have at-least 6 characters',
		match: 'Passwords are not matching'
	};

	public passwordMatch = (c: AbstractControl)
		: { [key: string]: boolean } | null => {
		const passwordControl = c.get('password');
		const confirmPasswordControl = c.get('confirmPassword');
		if (passwordControl.pristine || confirmPasswordControl.pristine) {
			return null;
		}
		if (passwordControl.value === confirmPasswordControl.value) {
			return null;
		}
		return {match: true};
	}

}
