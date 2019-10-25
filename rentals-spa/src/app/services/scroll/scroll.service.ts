import { Injectable } from '@angular/core';

import { fromEvent, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    private readonly _contentElementClassName = 'mat-drawer-content';
    private _scrolled$: Observable<Event>;

    constructor() {
        const element = document.getElementsByClassName(this._contentElementClassName)[0];
        this._scrolled$ = fromEvent(element, 'scroll');
    }

    scrolled(): Observable<Event> {
        return this._scrolled$;
    }
}
