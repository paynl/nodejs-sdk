import { CreateAmount } from '../order/Amount';
import { Stats } from '../shared';

export type CreateMandate = {
    description: string;
    type: 'SINGLE' | 'RECURRING' | 'FLEXIBLE';
    amount: CreateAmount;
    reference?: string;
    processDate?: Date;
    exchangeUrl?: string;
    interval?: {
        period: 'day' | 'week' | 'month' | 'trimester' | 'halfyear' | 'year';
        quantity: number;
        value: number;
    };
    customer?: {
        ipAddress: string;
        email: string;
        bankAccount: {
            owner: string;
            iban: string;
            bic?: string;
        };
    };
    stats?: Stats;
};

export type Mandate = {
    code: string;
    serviceId: string;
    reference: string;
    description: string;
    processDate: string;
    exchangeUrl: string | null;
    type: 'RECURRING' | 'SINGLE' | 'FLEXIBLE';
    interval?: {
        value: number;
        quantity: number;
        period: 'day' | 'week' | 'month' | 'trimester' | 'halfyear' | 'year';
    };
    amount: {
        value: number;
        currency: string;
    };
    customer: {
        email: string;
        ipAddress: string;
        bankAccount: {
            iban: string;
            bic?: string;
            owner: string;
        };
    };
    service: {
        code: string;
        name: string;
    };
    merchant: {
        code: string;
        name: string;
        status: 'ACTIVE' | 'INACTIVE';
        incorporationCountry: string;
    };
    stats?: Stats | null;
    lastDirectDebitDate: string;
    nextDirectDebitDate: string;
    actualDirectDebitDate: string;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string;
    deletedAt: string | null;
    deletedBy: string | null;
    _links: {
        href: string;
        rel: string;
        type: string;
    }[];
};
