import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './containers';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: UsersComponent
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
