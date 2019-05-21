import { AbstractControl } from '@angular/forms';

export class Validations {

	public textInputErrorMessages = {
		required: 'This field is required',
		minlength: 'This field should have at-least 4 characters',
		email: 'Invalid email format',
		invalidContact: 'Invalid contact format, please enter a value with this format +25670000000'
	};

	public passwordInputErrorMessages = {
		required: 'This field is required',
		minlength: 'This field should have at-least 6 characters',
		match: 'Passwords are not matching'
	};

	public validateContact = (c: AbstractControl):
		{ [key: string]: boolean } | null => {
		const contactValue = c.value;
		return (contactValue !== '') &&
		contactValue.match(new RegExp(/^[0-9]{10,13}$/))
			? null
			: { invalidContact: true };
	}


}
