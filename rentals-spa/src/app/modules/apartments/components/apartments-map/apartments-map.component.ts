import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { Apartment } from './../../models';

@Component({
    selector: 'app-apartments-map',
    templateUrl: './apartments-map.component.html',
    styleUrls: ['./apartments-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApartmentsMapComponent implements OnInit {
    @Input()
    apartments: Apartment[];

    @Output()
    itemClicked = new EventEmitter<Apartment>();

    private _previousMarkerInfoWindow: { close: () => void; };

    constructor() { }

    ngOnInit() {
    }

    selectMarker(markerInfoWindow: { close: () => void; }) {
        if (this._previousMarkerInfoWindow) {
            this._previousMarkerInfoWindow.close();
        }

        this._previousMarkerInfoWindow = markerInfoWindow;
    }

    selectItem(apartment: Apartment): void {
        this.itemClicked.emit(apartment);
    }
}
