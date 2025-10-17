export type ServiceConfig = {
    mcc: number | null;
    code: string;
    name: string;
    _links: {
        rel: string;
        href: string;
        type: string;
    }[];
    layout: {
        code: string;
        name: string;
        cssUrl: string;
        icon: string;
        supportingColor: string;
        headerTextColor: string;
        buttonColor: string;
        buttonTextColor: string;
    } | null;
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
    publication?: {
        domainUrl: string;
    } | null;
    testMode: boolean;
    createdAt: string;
    createdBy: string;
    deletedAt: string | null;
    deletedBy: string | null;
    tradeName: { code: string; name: string } | null;
    modifiedAt: string;
    modifiedBy: string;
    contactEmail: string;
    contactPhone: string;
    translations: Translations<'name'>;
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
        translations: Translations<'name'>;
        paymentMethods: {
            id: number;
            name: string;
            image: string;
            options: {
                id: string;
                name: string;
                image: string;
            }[];
            settings: { key: string; value: string }[] | null;
            maxAmount: number;
            minAmount: number;
            description: string;
            translations: Translations<'name' | 'description'>;
            targetCountries: string[];
        }[];
        requiredFields: { fieldName: string; mandatory: 'required' }[] | null;
    }[];
    checkoutSequence: {
        default: {
            primary: string[];
            secondary: string[];
        };
    };
};

export type Translations<T extends string> = Record<T, Record<LanguageCode, string>> | null;

/**
 * @example nl_NL or en_GB
 */
export type LanguageCode = string;
