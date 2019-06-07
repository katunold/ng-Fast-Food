import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-tool-bar',
	templateUrl: './tool-bar.component.html',
	styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
	@Input() tool_bar_title: string;
	@Input() button_name: string;
	@Input() button_name1: string;
	@Output() create: EventEmitter<any> = new EventEmitter<any>();
	@Output() addMenu: EventEmitter<any> = new EventEmitter<any>();
	rights: any = JSON.parse(sessionStorage.getItem('currentUser'));
	display: boolean;

	constructor() { }

	ngOnInit() {
		this.display = this.rights.logged_in_as === 'admin';
	}

	openDialog($event: MouseEvent) {
		this.create.emit($event);
	}

	openAddMenuDialog($event: MouseEvent) {
		this.addMenu.emit($event);
	}
}
