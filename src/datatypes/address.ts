export class Address {
    streetName?: string;
    houseNumber?: string;
    houseNumberExtension?: string;
    zipCode?: string;
    city?: string;
    countryCode?: string;
}

export class InvoiceAddress extends Address {
    initials?: string;
    lastName?: string;
    gender?: string;
}
