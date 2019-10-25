import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRole } from '../../models';
import { AuthGuard, RolesGuard } from '../auth/guards';
import { ApartmentsComponent, CreateApartmentComponent, EditApartmentComponent } from './containers';

const routes: Routes = [
    {
        path: 'apartments',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: ApartmentsComponent
            },
            {
                path: 'create',
                canActivate: [RolesGuard],
                data: {
                    roles: [UserRole.Realtor, UserRole.Admin],
                    redirectTo: '/apartments/list'
                },
                component: CreateApartmentComponent
            },
            {
                path: 'edit/:apartmentId',
                canActivate: [RolesGuard],
                data: {
                    roles: [UserRole.Realtor, UserRole.Admin],
                    redirectTo: '/apartments/list'
                },
                component: EditApartmentComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule { }
