import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
	selector: 'app-place-order',
	templateUrl: './place-order.component.html',
	styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit, OnDestroy{
	private unsubscribe$: Subject<any> = new Subject<any>();
	orderForm: FormGroup;
	constructor(
		public dialogRef: MatDialogRef<PlaceOrderComponent>,
		@Inject(MAT_DIALOG_DATA) public data,
		private formBuilder: FormBuilder,
		private httpService: HttpService,
		private snackBarService: SnackBarService
	) {}

	ngOnInit(): void {
		this.orderForm = this.formBuilder.group({
			order_item: ['', Validators.required],
			special_notes: ['']
		});
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onSubmit = () => {
		const order_data = this.orderForm.value;
		this.onNoClick();
		this.httpService.requests_to_backend('/orders', 'post', order_data)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				response => {
					const { message } = response;
					this.snackBarService.displaySnackBar(
						message,
						'success-snackbar');
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
