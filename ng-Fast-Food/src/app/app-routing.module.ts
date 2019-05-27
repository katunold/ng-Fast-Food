import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AuthGuard } from './guards/AuthGuard/auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'register', component: UserRegisterComponent },
	{ path: 'register/admin', component: UserRegisterComponent },
	{ path: 'login', component: UserLoginComponent},
	{
		path: '',
		loadChildren: './modules/feature/feature.module#FeatureModule',
		canActivate: [AuthGuard]
	},
	{ path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
