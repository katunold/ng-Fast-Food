import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private http: AuthService,
		private snackBar: SnackBarService,
		private router: Router
	) { }

	ngOnInit() {
		this.loginForm = this.fb.group({
			user_name: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	onLogin = () => {
		const login = this.loginForm;
		const loginData = {
			user_name: login.get('user_name').value,
			password: login.get('password').value
		};
		sessionStorage.setItem('account_name', loginData.user_name);
		this.http.loginUser(loginData).pipe(first()).subscribe(
			() => this.router.navigate(['/menu']),
			error => this.snackBar.displaySnackBar(
				error.error.message, 'error-snackbar')
		);
	}

}
