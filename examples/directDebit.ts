import { createPayNLClient } from '../src';

const payNL = createPayNLClient({
    apiToken: 'your-api-token',
    serviceId: 'SL-1234-5678',
    ATCode: 'AT-1234-5678',
});

const mandate = await payNL.DirectDebit.createMandate({
    amount: { value: 1000, currency: 'EUR' },
    description: 'example description',
    type: 'FLEXIBLE',
});

const directDebit = await payNL.DirectDebit.add({
    mandateId: mandate.code,
    processDate: new Date('2025-10-10'),
    description: 'Test direct debit',
    amount: {
        value: 1000,
        currency: 'EUR',
    },
});

console.log(directDebit.description);
