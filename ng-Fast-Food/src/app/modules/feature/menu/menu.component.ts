import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
	dataSource = new MatTableDataSource();
	private unsubscribe$: Subject<any> = new Subject<any>();
	loading: boolean;
	menu_items: any;
	displayedColumns: string[] = ['avatar', 'item_name', 'price', 'item_status'];

	constructor(
		private httpService: HttpService,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		this.httpService.getData('/menu').pipe(takeUntil(this.unsubscribe$))
			.subscribe(
			response => {
				this.addData(response);
				const { data } = response;
				this.httpService.menu_items.next(data);
				this.httpService.loading.next(false);
			},
			error => console.log(error)
		);
		this.httpService.loading.subscribe(bool => this.loading = bool);
		this.httpService.menu_items.subscribe(data => this.menu_items = data);
	}

	addData = (data) => {
		const data_recorded = data.data;
		if (data_recorded.length > 0) {
			this.dataSource.data = data_recorded;
		} else {
			console.log('no data returned');
		}
	}

	openDialog = (): void  => {
		const dialogRef = this.dialog.open(PlaceOrderComponent, {
			width: '400px',
			data: this.menu_items
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}
}
