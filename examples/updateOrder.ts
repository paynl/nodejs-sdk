import { createPayNLClient } from '../src';

const payNL = createPayNLClient({ apiToken: 'your-api-token' });

const orderId = '00000000-1111-2222-3333-000000000000';

const order = await payNL.Orders.update(orderId, 'REF01', 'This is a description');

console.log(order.reference, order.description);
