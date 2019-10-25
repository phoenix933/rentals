import { Component, OnInit, Input, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';

const DROPDOWN_SLIDER_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownSliderComponent),
    multi: true
};

@Component({
    selector: 'app-dropdown-slider',
    templateUrl: './dropdown-slider.component.html',
    styleUrls: ['./dropdown-slider.component.scss'],
    providers: [DROPDOWN_SLIDER_CONTROL_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownSliderComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input()
    min: number;

    @Input()
    max: number;

    @Input()
    label = 'Range';

    form: FormGroup;

    // tslint:disable-next-line: ban-types
    private _onModelChange: Function;
    // tslint:disable-next-line: ban-types
    private _onTouch: Function;

    private _lastEmitted: [number, number] = [null, null];

    private _unsubscribeAll$ = new Subject<void>();

    constructor(
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.form = this._formBuilder.group({
            range: [[this.min, this.max]]
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    registerOnChange(fn: any): void {
        this._onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouch = fn;
    }

    writeValue(value: [number, number]): void {
        if (value && value.length === 2) {
            const [low, high] = value;
            this._setValue(low, high);
        }
    }

    resetForm(): void {
        this._setValue(this.min, this.max);
    }

    onMenuClosed(): void {
        if (this._onModelChange && this._onTouch) {
            const [lastLow, lastHigh] = this._lastEmitted;
            const [low, high] = this.form.value.range;

            if (low !== lastLow || high !== lastHigh) {
                const value = {
                    low: low !== this.min ? low : null,
                    high: high !== this.max ? high : null
                };

                this._onModelChange(value);
                this._onTouch(value);
                this._lastEmitted = this.form.value.range;
            }
        }
    }

    get low(): number {
        return this.form.get('range').value[0];
    }

    get high(): number {
        return this.form.get('range').value[1];
    }

    get hasValue(): boolean {
        return this.low !== this.min || this.high !== this.max;
    }

    private _setValue(low: number, high: number): void {
        this.form.setValue({ range: [low, high] }, { emitEvent: false });
    }
}
