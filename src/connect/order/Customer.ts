export type Customer = {
    email?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: Date | string;
    gender?: string;
    phone?: string;
    language?: string;
    /** Locale code like "en_US" or "nl_BE" */
    locale?: `${Lowercase<string>}_${Uppercase<string>}`;
    ipAddress?: string;
    trust?: number;
    reference?: string;
    gaClientId?: string;
    company?: {
        name?: string;
        cocNumber?: string;
        vatNumber?: string;
        country?: string;
    };
};
