import { createPayNLClient } from '../src/index.ts';

const payNL = createPayNLClient({ username: 'AT-1234-5678', password: 'your-api-token' });

const orderId = '00000000-1111-2222-3333-000000000000';

try {
    const refund = await payNL.Orders.refund(orderId, 100);
    console.log(refund.description);
} catch (error) {
    console.log(error.statusCode);
    console.log(error.body?.detail);
    console.log(error.body?.violations);
}

