import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthData } from '../../../models/auth-data';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
	userName: string;
	rights: AuthData = JSON.parse(sessionStorage.getItem('currentUser'));
	display: boolean;

	constructor(
		private authService: AuthService
	) { }

	ngOnInit() {
		this.userName = sessionStorage.getItem('account_name');
		this.display = this.rights.logged_in_as === 'admin';
	}

	onLogout = () => {
		this.authService.logout();
	}

}
