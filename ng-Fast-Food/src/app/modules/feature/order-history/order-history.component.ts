import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { SingleOrderComponent } from 'src/app/modules/feature/single-order/single-order.component';

@Component({
	selector: 'app-order-history',
	templateUrl: './order-history.component.html',
	styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
	private unsubscribe$: Subject<any> = new Subject<any>();
	loading = true;
	dataSource = new MatTableDataSource();
	displayedColumns: string[] = [
		'order_id',
		'order_item',
		'special_notes',
		'order_cost',
		'order_date',
		'order_status'];

	constructor(
		private httpService: HttpService,
		private snackBarService: SnackBarService,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		this.httpService.getData('/users/orders')
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				response => {
					this.addData(response);
					this.httpService.loading.next(false);
				},
				error => {
					this.snackBarService.displaySnackBar(
					error.message,
					'error-snackbar');
					this.httpService.loading.next(false);
				}
			);

		this.httpService.loading.pipe(takeUntil(this.unsubscribe$)).subscribe(
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

	selected = (order_history) => {
		this.dialog.open(SingleOrderComponent, {
			width: '400px',
			data: order_history
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}

}
