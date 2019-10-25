import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard, RolesGuard } from './modules/auth/guards';
import { UserRole } from './models';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'apartments',
        pathMatch: 'full'
    },
    {
        path: 'users',
        canActivate: [AuthGuard, RolesGuard],
        data: {
            roles: [UserRole.Admin],
            redirectTo: '/apartments/list'
        },
        loadChildren: './modules/users/users.module#UsersModule'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
