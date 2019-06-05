const createSpyObj = (name: string, methods: string[]) => {
	// @ts-ignore
	return jasmine.createSpyObj(name, methods);
};

export const httpServiceSpy = createSpyObj('HttpService', [
	'requests_to_backend',
	'loading',
	'menu_items'
]);

export const authServiceSpy = createSpyObj('AuthService', [
	'currentUserValue',
	'loginUser',
	'logout'
]);

export const snackBarServiceSpy = createSpyObj('SnackBarService', [
	'displaySnackBar'
]);

export const httpClientSpy = createSpyObj('HttpClient', [
	'post',
	'get',
	'put',
	'delete',
]);

export const routerSpy = createSpyObj('Router', [
	'navigate'
]);

export const httpHandlerSpy = createSpyObj('HttpHandler', [
	'handle'
]);

export const matDialogSpy = createSpyObj('MatDialog', [
	'open'
]);
