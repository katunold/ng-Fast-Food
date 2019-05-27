import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthData } from 'src/app/models/auth-data';
import { HttpService } from 'src/app/services/http/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
	userName: string;
	rights: AuthData = JSON.parse(sessionStorage.getItem('currentUser'));
	display: boolean;
	private unsubscribe$: Subject<any> = new Subject<any>();

	constructor(
		private authService: AuthService,
		private httpService: HttpService,
		private snackBarService: SnackBarService
	) { }

	ngOnInit() {
		this.userName = sessionStorage.getItem('account_name');
		this.display = this.rights.logged_in_as === 'admin';
	}

	onLogout = () => {
		this.httpService.postData('/auth/logout/', '')
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				() => {
					this.authService.logout();
				},
				error => {
					this.snackBarService.displaySnackBar(
						error.message,
						'error-snackbar');
				}
			);
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}

}
