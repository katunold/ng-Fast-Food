import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

const routes: Routes = [
	{ path: '', redirectTo: '/register', pathMatch: 'full' },
	{ path: 'register', component: UserRegisterComponent },
	{ path: 'login', component: UserLoginComponent},
	{ path: '**', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
