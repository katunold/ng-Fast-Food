import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { SharedImports } from 'src/app/utils/test/shared-imports';

describe('SnackBarService', () => {
	let service: SnackBarService;
	const sharedImports = new SharedImports();
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [...sharedImports.getSharedImports()]
		});
		service = TestBed.get(SnackBarService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should display success snackbar', () => {
		const spy = spyOn(service.snackBar, 'open');
		service.displaySnackBar(
			'Request Successful',
			'success-snackbar');
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
