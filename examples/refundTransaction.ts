import { createPayNLClient } from '../src/index.ts';

const payNL = createPayNLClient({ username: 'AT-1234-5678', password: 'your-api-token' });

const orderId = '00000000-1111-2222-3333-000000000000';

const refund = await payNL.Orders.refund(orderId);
// or 
const refund = await payNL.Orders.refund(orderId, 100);

console.log(refund.description);
