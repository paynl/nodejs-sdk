import { createPayNLClient } from '../src';

const payNL = createPayNLClient({ password: 'your-api-token' });

const orderId = '00000000-1111-2222-3333-000000000000';

const order = await payNL.Orders.get(orderId);

console.log(order);
