import { OrderCreateOptions } from '../../src/order/CreateOrderOptions';

export const fakeCreateOrderOptions: OrderCreateOptions = {
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
        locale: 'en_GB',
        trust: 1,
        reference: 'MyRef',
        company: {
            name: 'CompanyName',
            cocNumber: '12345678',
            vatNumber: 'NL807960147B01',
            country: 'NL',
        },
    },
    order: {
        countryCode: 'NL',
        deliveryDate: new Date('2024-12-17T03:24:00"'),
        invoiceDate: new Date('2024-12-17T03:24:00"'),
        deliveryAddress: {
            street: 'Istreet',
            streetNumber: '70',
            zipCode: '1234AB',
            city: 'City',
            region: 'ZH',
            country: 'NL',
        },
        invoiceAddress: {
            street: 'Other street',
            streetNumber: '1',
            streetNumberExtension: 'B1',
            zipCode: '1234AB',
            city: 'City',
            region: 'ZH',
            country: 'NL',
        },
    },
    integration: {
        test: true,
    },
};
