export type ServiceConfig = {
    mcc: number;
    code: string;
    name: string;
    _links: {
        rel: string;
        href: string;
        type: string;
    }[];
    layout: null;
    secret: string;
    status: string;
    address: {
        city: string;
        code: string;
        zipCode: string;
        streetName: string;
        countryCode: string;
        streetNumber: string;
    };
    tguList: {
        ID: number;
        share: number;
        domain: string;
        status: string;
    }[];
    category: {
        code: string;
        name: string;
    };
    merchant: {
        code: string;
        name: string;
        status: string;
    };
    testMode: boolean;
    createdAt: string;
    createdBy: string;
    deletedAt: null;
    deletedBy: null;
    tradeName: null;
    modifiedAt: string;
    modifiedBy: string;
    contactEmail: string;
    contactPhone: string;
    translations: {
        name: {
            nl_NL: string;
        };
    };
    checkoutTexts: never[];
    turnoverGroup: {
        code: string;
        name: string;
    };
    encryptionKeys: {
        createdAt: string;
        expiresAt: string;
        publicKey: string;
        identifier: string;
    }[];
    checkoutOptions: {
        id: number;
        tag: string;
        name: string;
        image: string;
        translations: {
            name: {
                nl_NL?: string;
                en_GB?: string;
            };
        };
        paymentMethods: {
            id: number;
            name: string;
            image: string;
            options: {
                id: string;
                name: string;
                image: string;
            }[];
            settings: null;
            maxAmount: number;
            minAmount: number;
            description: string;
            translations: {
                name: {
                    [key: string]: string;
                };
                description: {
                    [key: string]: string;
                };
            };
            targetCountries: string[];
        }[];
        requiredFields: null;
    }[];
    checkoutSequence: {
        default: {
            primary: string[];
            secondary: string[];
        };
    };
};
