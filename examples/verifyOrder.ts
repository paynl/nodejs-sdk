import { createPayNLClient } from '../src';

const payNL = createPayNLClient({ apiToken: 'your-api-token', serviceId: 'SL-1234-5678' });

const orderId = '00000000-1111-2222-3333-000000000000';

let order;

order = await payNL.Orders.approve(orderId);
// or
order = await payNL.Orders.decline(orderId);
// or
order = await payNL.Orders.capture(orderId);
// or
order = await payNL.Orders.captureWithAmount(orderId, 9000);
// or
order = await payNL.Orders.captureWithProducts(orderId, [{ id: 'P1', quantity: 9 }]);

console.log(order.status.action);
