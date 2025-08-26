export type Optimize = {
    flow?: 'fastCheckout';
    shippingAddress?: boolean;
    billingAddress?: boolean;
    contactDetails?: boolean;
    mcc?: string;
    collectorAccount?: {
        method: string;
        iban: {
            iban: string;
            bic: string;
            owner: string;
        };
    };
    collectorCompany?: {
        id: string;
        name: string;
        countryCode: string;
    };
};
