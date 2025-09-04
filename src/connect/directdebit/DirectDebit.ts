import { Stats } from '../shared';

export type CreateDirectDebit = {
    mandateId: string;
    processDate: Date;
    description: string;
    amount: {
        value: number;
        currency?: string;
    };
    stats?: Stats;
    isLastOrder?: boolean;
};

export type DirectDebit = {
    id: string;
    description: string;
    url: string;
    processDate: string;
    orderId: string;
    paymentSessionId: string;
    type: 'SINGLE' | 'RECURRING' | 'FLEXIBLE';
    amount: {
        value: number;
        currency: string;
    };
    status: {
        code: number;
        action: string;
        phase: string;
    };
    declined: boolean;
    decline: {
        code: number;
        name: string;
        date: string;
    };
    bankAccount: {
        iban: string;
        bic: string;
        owner: string;
    };
    mandate: {
        code: string;
        description: string;
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
    stats: Stats;
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
