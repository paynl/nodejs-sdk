import { createPayNLClient } from '../../src';

const payNL = createPayNLClient({ apiToken: 'your-api-token', serviceId: 'SL-1234-5678' });

const createdOrder = await payNL.Orders.create();

console.log(createdOrder);
