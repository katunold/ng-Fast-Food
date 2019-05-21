import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
	providedIn: 'root'
})
export class SnackBarService {

	constructor(
		private snackBar: MatSnackBar
	) { }

	displaySnackBar = (message, status) => {
		this.snackBar.open(message, 'close', {
			duration: 3000,
			horizontalPosition: 'right',
			verticalPosition: 'top',
			panelClass: [status]
		});
	}
}
