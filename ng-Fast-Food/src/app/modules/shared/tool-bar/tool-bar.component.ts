import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-tool-bar',
	templateUrl: './tool-bar.component.html',
	styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
	@Input() tool_bar_title: string;
	@Input() button_name: string;
	@Output() create: EventEmitter<any> = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

	openDialog($event: MouseEvent) {
		this.create.emit($event);
	}
}
