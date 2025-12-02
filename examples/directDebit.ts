import { createPayNLClient } from '../src/index.ts';

const payNL = createPayNLClient({ username: 'AT-1234-5678', password: 'your-api-token' });

const mandate = await payNL.DirectDebit.createMandate({
    serviceId: 'SL-1234-5678',
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
