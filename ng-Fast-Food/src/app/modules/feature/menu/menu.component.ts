import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { HttpService } from 'src/app/services/http/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { AddMenuItemComponent } from 'src/app/modules/feature/add-menu-item/add-menu-item.component';
import { AuthData } from 'src/app/models/auth-data';
import { DeleteMenuItemComponent } from 'src/app/modules/feature/delete-menu-item/delete-menu-item.component';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
	dataSource = new MatTableDataSource();
	display: boolean;
	rights: AuthData = JSON.parse(sessionStorage.getItem('currentUser'));
	private unsubscribe$: Subject<any> = new Subject<any>();
	loading = true;
	menu_items: any;
	displayedColumns: string[] = ['avatar', 'item_name', 'price', 'item_status', 'actions'];

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
		this.display = this.rights.logged_in_as === 'admin';
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
		this.dialog.open(PlaceOrderComponent, {
			width: '400px',
			data: this.menu_items
		});
	}

	openAddMenuDialog = (): void  => {
		const dialogRef = this.dialog.open(AddMenuItemComponent, {
			width: '400px'
		});
		this.afterClose(dialogRef);
	}

	openDeleteDialog = (id, name): void => {
		const dialogRef = this.dialog.open(DeleteMenuItemComponent, {
			width: '400px',
			data: {id, name}
		});
		this.afterClose(dialogRef);
	}

	afterClose = reference => {
		reference.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(
			() => this.ngOnInit()
		);
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}
}
