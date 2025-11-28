import { createPayNLClient } from '../src/index.ts';

const payNL = createPayNLClient({ username: 'AT-1234-5678', password: 'your-api-token' });

const methods = await payNL.Core.PaymentMethods('nl_NL');

console.log(methods.paymentMethods);
