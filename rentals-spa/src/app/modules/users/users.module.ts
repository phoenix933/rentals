import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule,
    MatSelectModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,
    MatProgressBarModule,
    MatDialogModule,
    MatRadioModule,
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UsersRoutingModule } from './users-routing.module';
import { components } from './components';
import { containers } from './containers';
import { dialogs } from './dialogs';
import { effects, reducer } from './store';

@NgModule({
    declarations: [
        ...components,
        ...containers,
        ...dialogs
    ],
    entryComponents: [
        ...dialogs
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatDialogModule,
        MatRadioModule,

        StoreModule.forFeature('users', reducer),
        EffectsModule.forFeature(effects),

        UsersRoutingModule,
    ]
})
export class UsersModule { }
