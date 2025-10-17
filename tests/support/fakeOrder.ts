import { Order } from '../../src';

export const orderCreateResponse: Order = {
    type: 'sale',
    serviceId: 'SL-####-####',
    description: 'Instore Terminal Order #27',
    reference: 'REF1234',
    manualTransferCode: '0000 0000 0000 0000',
    orderId: '0000',
    uuid: '019642b8-9d82-78cf-83bd-ed07c40e3bad',
    customerKey: null,
    status: {
        code: 20,
        action: 'PENDING',
    },
    receipt: null,
    integration: {
        pointOfInteraction: null,
        test: false,
    },
    stats: {
        extra1: 'extra1',
        extra2: 'extra2',
        extra3: 'extra3',
        tool: 'tool',
        info: 'info',
        object: 'object',
        promotorId: 0,
        domainId: 'WU-1234-5678',
    },
    transferData: {
        key: 'value',
    },
    amount: {
        value: 100,
        currency: 'EUR',
    },
    authorizedAmount: {
        value: 0,
        currency: 'EUR',
    },
    capturedAmount: {
        value: 0,
        currency: 'EUR',
    },
    checkoutData: null,
    payments: [],
    createdAt: '2025-04-17T09:48:37+02:00',
    createdBy: 'AT-1234-1234',
    modifiedAt: '2025-04-17T09:49:37+02:00',
    modifiedBy: 'TGU 123456',
    expiresAt: '2025-04-17T10:03:37+02:00',
    completedAt: null,
    links: {
        status: '<status_url>',
        abort: '<abort_url>',
        redirect: '<redirect_url>',
    },
};
