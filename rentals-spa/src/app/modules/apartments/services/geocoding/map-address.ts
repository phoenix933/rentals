import { Address } from '../../models';

const dictionary: { [key: string]: { key: keyof Address; useValue?: 'short_name' | 'long_name' } } = {
    // street1
    street_number: { key: 'street1' },
    route: { key: 'street1' },

    // street2
    neighborhood: { key: 'street2' },

    // city
    locality: { key: 'city' },

    // state
    administrative_area_level_1: { key: 'state' },

    // country
    country: { key: 'country', useValue: 'short_name' },

    // postalCode
    postal_code: { key: 'postalCode' },
    postal_code_suffix: { key: 'postalCode' },
};

export function mapAddress(addressComponents: any[]): Partial<Address> {
    const address: Partial<Address> = { };

    for (const addressComponent of addressComponents) {
        for (const addressType of addressComponent.types) {
            if (dictionary[addressType]) {
                const key = dictionary[addressType].key;
                const value = dictionary[addressType].useValue ?
                    addressComponent[dictionary[addressType].useValue] :
                    addressComponent.long_name;

                (address[key] as any) = address[key] ? `${address[key]} ${value}` : value;
            }
        }
    }

    return address;
}
