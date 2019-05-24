import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	selector: 'app-single-order',
	templateUrl: './single-order.component.html',
	styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<SingleOrderComponent>,
		@Inject(MAT_DIALOG_DATA) public data,
	) { }

	ngOnInit() {
	}

}
