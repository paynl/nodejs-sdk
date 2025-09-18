import { createPayNLClient } from '../src';

const payNL = createPayNLClient({
    apiToken: 'your-api-token',
    ATCode: 'AT-1234-5678',
});

const methods = await payNL.Core.PaymentMethods('nl_NL');

console.log(methods.paymentMethods);
