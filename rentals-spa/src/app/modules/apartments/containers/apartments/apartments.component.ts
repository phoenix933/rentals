import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent, MatDialog } from '@angular/material';

import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, filter, skip } from 'rxjs/operators';

import { ScrollService, RouterService } from '../../../../services';
import { UserRole } from '../../../../models';
import { AuthService } from './../../../auth/services';
import { ApartmentDetailsComponent, DeleteApartmentComponent } from '../../dialogs';
import { Apartment, ApartmentListFilter } from '../../models';
import { ApartmentsService } from '../../services';

@Component({
    selector: 'app-apartments',
    templateUrl: './apartments.component.html',
    styleUrls: ['./apartments.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApartmentsComponent implements OnInit, AfterViewInit, OnDestroy {
    apartments: Apartment[] = [];
    count$: Observable<number>;
    getApartmentsLoading$: Observable<boolean>;

    UserRole = UserRole;

    role: UserRole;
    mapSticky = false;
    mapVisible = true;

    readonly pageSize = 5;

    private readonly _defaultFilter: ApartmentListFilter = { limit: this.pageSize, offset: 0 };

    private _filter$ = new BehaviorSubject<ApartmentListFilter>(this._defaultFilter);

    @ViewChild('map', { static: false})
    private _map: ElementRef;

    @ViewChild('paginator', { static: false })
    private _paginator: MatPaginator;

    private _unsubscribeAll$ = new Subject<void>();

    constructor(
        private _apartmentsService: ApartmentsService,
        private _scrollService: ScrollService,
        private _routerService: RouterService,
        private _authService: AuthService,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        this._filter$
            .asObservable()
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((listFilter: ApartmentListFilter) => this._apartmentsService.getApartments(listFilter));

        this._authService.userRole$
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((role: UserRole) => this.role = role);

        this.count$ = this._apartmentsService.apartmentsCount$;
        this.getApartmentsLoading$ = this._apartmentsService.getApartmentsLoading$;

        this._apartmentsService
            .apartments$
            .pipe(
                skip(1),
                takeUntil(this._unsubscribeAll$)
            )
            .subscribe((apartments: Apartment[]) => {
                this.apartments = apartments;
                this.mapVisible = !!apartments.length;
            });
    }

    ngAfterViewInit() {
        const mapElement = this._map.nativeElement;
        const mapInitialPosition = mapElement.offsetTop;

        // HostBinding won't work because of the mat-sidenav-content
        this._scrollService
            .scrolled()
            .pipe(takeUntil(this._unsubscribeAll$))
            .subscribe((event: Event) => {
                const { scrollTop: scrollPosition } = event.target as HTMLDivElement;

                if (scrollPosition > mapInitialPosition) {
                    this.mapSticky = true;
                    mapElement.style.height = `100vh`;
                } else {
                    this.mapSticky = false;
                    mapElement.style.height = `calc(100vh - ${mapInitialPosition - scrollPosition}px)`;
                }
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll$.next();
        this._unsubscribeAll$.complete();
    }

    redirectToEdit(apartment: Apartment): void {
        this._routerService.go({ path: ['/apartments/edit', apartment.id] });
    }

    openDeleteApartmentDialog(apartment: Apartment): void {
        this._dialog
            .open(DeleteApartmentComponent, { data: { apartment } })
            .afterClosed()
            .pipe(filter(saved => saved))
            .subscribe(() => this._refreshApartments());
    }

    openApartmentDetailsDialog(apartment: Apartment): void {
        this._dialog.open(ApartmentDetailsComponent, { data: { apartment } });
    }

    toggleMapVisibility(): void {
        this.mapVisible = !this.mapVisible;
    }

    onFilterChanged(listFilter: ApartmentListFilter): void {
        this._paginator.firstPage();
        this._filter$.next({ ...this._defaultFilter, ...listFilter });
    }

    onPageChanged({ pageIndex, pageSize }: PageEvent): void {
        const offset = pageIndex * pageSize;
        const currentValue = this._filter$.getValue();
        this._filter$.next({ ...currentValue, offset });
    }

    // Showing the correct data without refreshing it from the server, is almost impossible after deletion.
    private _refreshApartments(): void {
        const currentValue = this._filter$.getValue();
        this._filter$.next(currentValue);
    }
}
