import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { takeUntil } from 'rxjs/operators';
import { MenuComponent } from 'src/app/modules/feature/menu/menu.component';

@Component({
	selector: 'app-add-menu-item',
	templateUrl: './add-menu-item.component.html',
	styleUrls: ['./add-menu-item.component.css']
})
export class AddMenuItemComponent implements OnInit, OnDestroy {
	private unsubscribe$: Subject<any> = new Subject<any>();
	menuItemForm: FormGroup;
	menu: MenuComponent;

	constructor(
		public dialogRef: MatDialogRef<AddMenuItemComponent>,
		private formBuilder: FormBuilder,
		private httpService: HttpService,
		private snackBarService: SnackBarService,
	) { }

	ngOnInit() {
		this.menuItemForm = this.formBuilder.group({
			food_item: ['', Validators.required],
			price: ['', Validators.required]
		});
	}

	onSubmit = () => {
		const data = this.menuItemForm.value;
		this.dialogRef.close();
		this.httpService.postData('/menu', data)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				response => {
					this.snackBarService.displaySnackBar(
						response.message, 'success-snackbar');
				},
				error => {
					const { message } = error.error;
					this.snackBarService.displaySnackBar(
						message, 'error-snackbar');
				}
			);
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}

}
