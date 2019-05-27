import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { SingleOrderComponent } from 'src/app/modules/feature/single-order/single-order.component';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
	dataSource = new MatTableDataSource();
	private unsubscribe$: Subject<any> = new Subject<any>();
	public orders$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
	single_order: any;
	loading = true;
	displayedColumns: string[] = [
		'order_id',
		'order_item',
		'client',
		'client_contact',
		'order_date',
		'order_status'];
	constructor(
		private httpService: HttpService,
		private snackBarService: SnackBarService,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		this.populateTable();
		this.httpService.loading.subscribe(
			bool => this.loading = bool
		);
	}

	addData = (data) => {
		const data_recorded = data.data;
		if (data_recorded.length > 0) {
			this.dataSource.data = data_recorded;
		} else {
			console.log('no data returned');
		}
	}

	selected = (selected_value) => {
		const { data, id } = selected_value;
		const { value } = data;
		this.httpService.updateData(`/orders/${id}`, {order_status: value})
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				response => {
					this.snackBarService.displaySnackBar(
						response.message, 'success-snackbar'
					);
				},
				error => {
					this.snackBarService.displaySnackBar(
						error.message, 'error-snackbar'
					);
					this.populateTable();
				}
			);
	}

	populateTable = () => {
		this.httpService.getData('/orders')
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				response => {
					const { data } = response;
					this.addData(response);
					this.httpService.loading.next(false);
					this.orders$.next(data);
				},
				error => console.log(error)
			);
	}

	singleOrder(id) {
		this.orders$.pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(
			response => {
				for (const orderItem of response) {
					if (id === orderItem.order_id) {
						this.single_order = orderItem;
						this.openDialog();
					}
				}
			},
			() => this.snackBarService
				.displaySnackBar(
					'Sorry, we are experiencing technical challenges',
					'error-snackbar')
		);
	}

	openDialog = (): void  => {
		const dialogRef = this.dialog.open(SingleOrderComponent, {
			width: '400px',
			data: this.single_order
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}

}
