import { createPayNLClient } from '../../src';

const payNL = createPayNLClient({ apiToken: 'your-api-token', serviceId: 'SL-1234-5678' });

const orderId = '00000000-1111-2222-3333-000000000000';

const orderStatus = await payNL.Orders.status(orderId);

console.log(orderStatus);
