import {ModuleWithProviders} from '@angular/core'; 
import {Routes, RouterModule} from '@angular/router'; 

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';

const appRoutes: Routes = [  
    { path: 'register', component:RegisterComponent},  
    { path: 'login', component:LoginComponent},  
    { path: 'logout', component:LogoutComponent},
    { path: 'home', component:HomeComponent},  
    { path: 'user', component:UserComponent, canActivate: [AuthGuard], data: {permission: {only: ["username", "admin"]}}},  
    { path: 'admin', component:AdminComponent, canActivate: [AuthGuard], data: {permission: {only: ["admin"]}}},  
    { path: '', component:HomeComponent, pathMatch:'full'} 
]; 

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes)