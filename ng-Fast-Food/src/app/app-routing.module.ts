import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegisterComponent } from './components/user-register/user-register.component';

const routes: Routes = [
	{ path: '', redirectTo: '/register', pathMatch: 'full' },
	{ path: 'register', component: UserRegisterComponent },
	{ path: '**', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
