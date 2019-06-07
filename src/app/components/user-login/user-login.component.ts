import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
	loginForm: FormGroup;
	loading: boolean;

	constructor(
		private fb: FormBuilder,
		private http: AuthService,
		private snackBar: SnackBarService,
		private router: Router
	) { }

	ngOnInit() {
		if (this.http.currentUserValue) {
			this.router.navigate(['menu']);
		}
		this.loginForm = this.fb.group({
			user_name: ['', Validators.required],
			password: ['', Validators.required]
		});
		this.loading = false;
	}

	onLogin = () => {
		this.loading = true;
		const login = this.loginForm;
		const loginData = {
			user_name: login.get('user_name').value,
			password: login.get('password').value
		};
		sessionStorage.setItem('account_name', loginData.user_name);
		this.http.loginUser(loginData).pipe(first()).subscribe(
			() => {
				this.router.navigate(['/menu']);
				this.loading = false;
			},
			error => {
				this.snackBar.displaySnackBar(
				error.error.message, 'error-snackbar');
				this.loading = false;
			}
		);
	}

}
