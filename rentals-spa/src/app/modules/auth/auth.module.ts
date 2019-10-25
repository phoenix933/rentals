import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer, effects } from './store';
import { containers } from './containers';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        ...containers
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,

        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,

        StoreModule.forFeature('auth', reducer),
        EffectsModule.forFeature(effects),

        AuthRoutingModule,
    ]
})
export class AuthModule { }
