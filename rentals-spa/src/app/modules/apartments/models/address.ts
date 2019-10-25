export interface Address {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;

    lat?: number;
    lng?: number;
}
