import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatCardModule, MatChipsModule, MatSlideToggleModule,
    MatMenuModule, MatPaginatorModule, MatSelectModule,
    MatDialogModule, MatProgressBarModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgmCoreModule } from '@agm/core';

import { NouisliderModule } from 'ng2-nouislider';

import { ApartmentsRoutingModule } from './apartments-routing.module';

import { components } from './components';
import { containers } from './containers';
import { dialogs } from './dialogs';

import { reducer, effects } from './store';

@NgModule({
    declarations: [
        ...components,
        ...containers,
        ...dialogs,
    ],
    entryComponents: [
        ...dialogs
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDialogModule,
        MatProgressBarModule,

        AgmCoreModule,
        NouisliderModule,

        StoreModule.forFeature('apartments', reducer),
        EffectsModule.forFeature(effects),

        ApartmentsRoutingModule,
    ]
})
export class ApartmentsModule { }
