import { createPayNLClient, ApiError, ValidationError } from '../../src';

const payNL = createPayNLClient({ apiToken: 'your-api-token', serviceId: 'SL-1234-5678' });

try {
    const order = await payNL.Orders.create({
        description: 'Order ABC0123456789',
        reference: 'abc1234',
        returnUrl: 'https://127.0.0.1/return',
        exchangeUrl: 'https://127.0.0.1/exchange',
        amount: {
            value: 1000,
            currency: 'EUR',
        },
        customer: {
            firstName: 'John',
            lastName: 'Doe',
            ipAddress: '12.34.56.78',
            birthDate: '1999-02-15',
            gender: 'M',
            phone: '0612345678',
            email: 'testbetaling@pay.nl',
            language: 'NL',
            locale: 'nl_NL',
        },
        integration: {
            // Enable sandbox mode
            test: true,
        },
    });

    console.log('Order ID:', order.id);
    console.log('Redirect:', order.links.redirect);
} catch (error) {
    if (error instanceof ValidationError) {
        console.error(error);
    } else if (error instanceof ApiError) {
        console.error('API Error:', error.statusCode(), error.statusText(), await error.body());
    }
}
