import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
	selector: 'app-delete-menu-item',
	templateUrl: './delete-menu-item.component.html',
	styleUrls: ['./delete-menu-item.component.css']
})
export class DeleteMenuItemComponent implements OnDestroy {
	private unsubscribe$: Subject<any> = new Subject<any>();

	constructor(
		public dialogRef: MatDialogRef<DeleteMenuItemComponent>,
		@Inject(MAT_DIALOG_DATA) public data,
		public httpService: HttpService,
		public snackBarService: SnackBarService
	) { }

	onDelete = (data) => {
		const {name, id} = data;
		this.dialogRef.close();
		this.httpService.requests_to_backend(`/menu/${id}`, 'delete')
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				() => {
					this.snackBarService.displaySnackBar(
						`${name} has been deleted from the menu`,
						'success-snackbar'
					);
				},
				error => {
					this.snackBarService.displaySnackBar(
						error.message,
						'error-snackbar'
					);
				}
			);
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}

}
