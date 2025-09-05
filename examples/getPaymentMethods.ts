import { createPayNLClient } from '../src';

const payNL = createPayNLClient({
    apiToken: 'your-api-token',
    serviceId: 'SL-1234-5678',
    ATCode: 'AT-1234-5678',
});

const methods = await payNL.PaymentMethods.all('nl_NL');

console.log(methods.paymentMethods);
