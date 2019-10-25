import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';

import { AgmCoreModule } from '@agm/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from './../environments/environment.prod';
import { ApartmentsModule } from './modules/apartments/apartments.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthInterceptor } from './modules/auth/interceptors';
import { reducers, metaReducers, CustomSerializer } from './store/reducers';
import { effects } from './store/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { googleMapsConfig } from './config/google-maps.config';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,

        // Ngrx
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot(effects),
        StoreRouterConnectingModule.forRoot(),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),

        // Google Maps
        AgmCoreModule.forRoot(googleMapsConfig),

        AppRoutingModule,
        AuthModule,
        ApartmentsModule
    ],
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: CustomSerializer
        },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 2500,
                verticalPosition: 'top',
                horizontalPosition: 'right'
            }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                width: '480px',
                panelClass: 'custom-dialog',
                hasBackdrop: true
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
