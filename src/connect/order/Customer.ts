export type Customer = {
    email?: string;
    firstName?: string;
    lastName?: string;
    /**
     * Should be formatted according to YYYY-MM-DD
     *
     * @example 1999-12-30
     */
    birthDate?: string;
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
