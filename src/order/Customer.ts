import { LocaleCode } from '../shared';

export type Customer = {
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    /**
     * Should be formatted according to YYYY-MM-DD
     *
     * @example 1999-12-30
     */
    birthDate?: string | null;
    gender?: string | null;
    phone?: string | null;
    language?: string | null;
    /** Locale code like "en_US" or "nl_BE" */
    locale?: LocaleCode | null;
    ipAddress?: string | null;
    trust?: number;
    reference?: string | null;
    gaClientId?: string | null;
    company?: Company;
};

export type Company = {
    name?: string | null;
    cocNumber?: string | null;
    vatNumber?: string | null;
    country?: string | null;
};
