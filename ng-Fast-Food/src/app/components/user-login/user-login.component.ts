import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http/http.service';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private http: HttpService
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
		this.http.loginUser(loginData).pipe(first()).subscribe(
			data => console.log(data),
			error => console.log(error)
		);
	}

}
