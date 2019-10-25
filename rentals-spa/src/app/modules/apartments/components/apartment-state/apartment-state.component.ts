import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { ApartmentState } from '../../models';

@Component({
    selector: 'app-apartment-state',
    templateUrl: './apartment-state.component.html',
    styleUrls: ['./apartment-state.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApartmentStateComponent implements OnInit {
    @Input()
    state: ApartmentState;

    ApartmentState = ApartmentState;

    constructor() { }

    ngOnInit() {
    }
}
