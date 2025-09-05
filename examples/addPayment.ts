import { createPayNLClient } from '../src';

const payNL = createPayNLClient({ apiToken: 'your-api-token', serviceId: 'SL-1234-5678' });

const orderId = '00000000-1111-2222-3333-000000000000';

const giftCard = {
    id: 1,
    input: {
        cardNumber: '6064363019',
        pincode: '123456',
    },
};

const order = await payNL.Orders.payment(orderId, giftCard);

console.log(order.payments);
