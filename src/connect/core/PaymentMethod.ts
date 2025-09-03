import { LocaleCode } from '../Locale';

export type PaymentMethod = {
    id: number;
    name: string;
    description: string;
    sequence: number;
    public: boolean;
    status: string;
    image: string;
    translations: {
        name: {
            [key: LocaleCode]: string;
        };
        description: {
            [key: LocaleCode]: string;
        };
    };
    targetCountries: string[];
    paymentProfiles: {
        id: number;
        name: string;
        publicName: string;
        public: boolean;
        selectable: boolean;
        paymentMethodGroup: string;
        paymentType: string;
        customerIdType: string | null;
        riskCategory: string;
        translations: unknown[];
        issuers: unknown[];
        categories: unknown[];
        createdAt: string;
        modifiedAt: string;
        deletedAt: string | null;
    }[];
    createdAt: string;
    modifiedAt: string | null;
    deletedAt: string | null;
};
