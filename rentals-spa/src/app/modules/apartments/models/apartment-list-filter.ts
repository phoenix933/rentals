import { ApartmentStateFilter } from './apartment-state-filter.enum';

export interface ApartmentListFilter {
    minAreaSize?: number;
    maxAreaSize?: number;
    minPrice?: number;
    maxPrice?: number;
    minRoomsCount?: number;
    maxRoomsCount?: number;
    limit?: number;
    offset?: number;
    state?: ApartmentStateFilter;
}
