import { Mandate } from '../../src';

export const fakeDirectDebitMandate: Mandate = {
    code: 'IO-####-####-####',
    serviceId: 'SL-####-####',
    reference: 'AX12345-TRA-6789',
    description: 'gym membership',
    processDate: '2025-01-01',
    exchangeUrl: null,
    type: 'RECURRING',
    interval: {
        value: 1,
        quantity: 12,
        period: 'month',
    },
    amount: {
        value: 4999,
        currency: 'EUR',
    },
    customer: {
        email: 'example@domain.com',
        ipAddress: '139.130.4.5',
        bankAccount: {
            iban: 'NL69INGB0123456789',
            bic: 'INGBNL2A',
            owner: 'John Doe',
        },
    },
    service: {
        code: 'SL-####-####',
        name: 'Fictional Super Gym New York.',
    },
    merchant: {
        code: 'M-####-####',
        name: 'Fictional Super Gym.',
        status: 'ACTIVE',
        incorporationCountry: 'NL',
    },
    stats: {
        info: 'info1',
        tool: 'tool1',
        object: 'object1',
        extra1: 'extra11',
        extra2: 'extra21',
        extra3: 'extra31',
        domainId: null,
    },
    lastDirectDebitDate: '2025-02-01T10:58:52+01:00',
    nextDirectDebitDate: '2025-02-01T10:58:52+01:00',
    actualDirectDebitDate: '2025-02-01T10:58:52+01:00',
    createdAt: '2025-01-01T01:58:52+00:00',
    createdBy: 'AT-####-####',
    modifiedAt: '2025-01-01T01:58:52+00:00',
    modifiedBy: 'AT-####-####',
    deletedAt: null,
    deletedBy: null,
    _links: [
        {
            href: '\\/directdebits\\/mandates/IO-####-####-####',
            rel: 'details',
            type: 'GET',
        },
        {
            href: '\\/directdebits\\/mandates',
            rel: 'self',
            type: 'POST',
        },
    ],
};

export const fakeDirectDebit = {
    id: 'IL-####-####-####',
    description: 'gym membership 2025-01-01',
    url: 'http:\\/\\/pay.nl',
    processDate: '2025-11-01T11:26:21+01:00',
    orderId: '0000000000X00000',
    paymentSessionId: '0000000000',
    type: 'FLEXIBLE',
    amount: {
        value: 4999,
        currency: 'EUR',
    },
    status: {
        code: 91,
        action: 'add',
        phase: 'Added',
    },
    declined: false,
    decline: {
        code: 119,
        name: 'Administrative reason',
        date: '2025-01-01T11:26:21+01:00',
    },
    bankAccount: {
        iban: 'NL69INGB0123456789',
        bic: 'INGBNL2A',
        owner: 'John Doe',
    },
    mandate: {
        code: 'IO-####-####-####',
        description: 'gym membership',
    },
    service: {
        code: 'SL-####-####',
        name: 'Fictional Super Gym New York.',
    },
    merchant: {
        code: 'M-####-####',
        name: 'Fictional Super Gym.',
        status: 'ACTIVE',
        incorporationCountry: 'NL',
    },
    stats: {
        info: 'string',
        tool: 'string',
        object: 'object1',
        extra1: 'string',
        extra2: 'string',
        extra3: 'string',
        domainId: null,
    },
    createdAt: '2025-01-01T11:26:21+01:00',
    createdBy: 'AT-####-####',
    modifiedAt: '2025-01-01T11:26:21+01:00',
    modifiedBy: 'AT-####-####',
    deletedAt: null,
    deletedBy: null,
    _links: [
        {
            href: '\\/directdebits\\/IL-####-####-####',
            rel: 'details',
            type: 'GET',
        },
        {
            href: '\\/directdebits',
            rel: 'self',
            type: 'POST',
        },
    ],
};
