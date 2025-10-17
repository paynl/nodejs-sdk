export type PostalAddress = {
    firstName?: string | null;
    lastName?: string | null;
    street?: string | null;
    streetNumber?: string | null;
    streetNumberExtension?: string | null;
    zipCode?: string | null;
    city?: string | null;
    country?: string | null;
    region?: string | null;
};

export type PaymentAddress = {
    firstName: string | null;
    lastName: string | null;
    street: string | null;
    houseNumber: string | null;
    addition: string | null;
    postalCode: string | null;
    city: string | null;
    companyName: string | null;
    countryName: string | null;
};

export type NewAddress = {
    firstName: string | null;
    lastName: string | null;
    streetName: string | null;
    streetNumberAddition: string | null;
    zipCode: string | null;
    city: string | null;
    countryCode: string | null;
    regionCode: string | null;
};
