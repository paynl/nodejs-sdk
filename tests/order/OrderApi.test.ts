import { ApiError } from '../../src';
import { orderCreateResponse } from '../support/fakeOrder';
import { OrderApi } from '../../src/order/OrderApi';
import { fakeCreateOrderOptions } from '../support/fakeCreateOrderOptions';
import { PaymentMethod } from '../../src/order/Payment';
import { ApiClientMock } from '../support/ApiClientMock';

const testOrderId = '00000000-1111-2222-3333-000000000000';

describe('OrderApi', () => {
    it('can send order:create with minimal data', async () => {
        const clientMock = new ApiClientMock();
        const subject = new OrderApi(clientMock.getMock());

        clientMock.mockResponse(orderCreateResponse);

        const response = await subject.create({
            amount: {
                value: 1000,
                currency: 'EUR',
            },
        });

        expect(response).toBe(orderCreateResponse);
        expect(clientMock.getRequest()).toEqual({
            url: 'https://connect.pay.nl/v1/orders',
            options: {
                method: 'POST',
                json: {
                    amount: {
                        value: 1000,
                        currency: 'EUR',
                    },
                    serviceId: 'SL-1234-5678',
                },
            },
        });
    });

    it('can send order:create with all data', async () => {
        const clientMock = new ApiClientMock();
        const subject = new OrderApi(clientMock.getMock());

        clientMock.mockResponse(orderCreateResponse);

        const response = await subject.create(fakeCreateOrderOptions);

        expect(response).toEqual(orderCreateResponse);
        expect(clientMock.getRequest()).toEqual({
            url: 'https://connect.pay.nl/v1/orders',
            options: {
                method: 'POST',
                json: {
                    ...fakeCreateOrderOptions,
                    serviceId: 'SL-1234-5678',
                },
            },
        });
    });

    it('can handle validation error for order:create', async () => {
        const clientMock = new ApiClientMock();
        const subject = new OrderApi(clientMock.getMock());

        clientMock.mockResponse(orderCreateResponse);

        clientMock.mockError(
            ApiError.createStatic(422, 'Unprocessable Entity', {
                type: 'unknown',
                code: 'unknown',
                title: 'Unknown SDK error',
                detail: 'The API error response could not be parsed.',
            }),
        );

        await expect(
            async () =>
                await subject.create({
                    amount: {
                        value: 1000,
                        currency: 'EUR',
                    },
                }),
        ).rejects.toThrow('HTTP 422 Unprocessable Entity');
        expect(clientMock.getRequest()).toEqual({
            url: 'https://connect.pay.nl/v1/orders',
            options: {
                method: 'POST',
                json: {
                    amount: {
                        value: 1000,
                        currency: 'EUR',
                    },
                    serviceId: 'SL-1234-5678',
                },
            },
        });
    });

    it('can get the order status', async () => {
        const clientMock = new ApiClientMock();
        const subject = new OrderApi(clientMock.getMock());

        clientMock.mockResponse({
            id: testOrderId,
            status: {
                code: 100,
                action: 'PAID',
            },
        });

        const response = await subject.status(testOrderId);

        expect(response.code).toBe(100);
        expect(response.action).toBe('PAID');
        expect(clientMock.getRequest()).toEqual({
            url: 'https://connect.pay.nl/v1/orders/00000000-1111-2222-3333-000000000000/status',
            options: {},
        });
    });

    it('can update the order reference and description', async () => {
        const clientMock = new ApiClientMock();
        const subject = new OrderApi(clientMock.getMock());

        clientMock.mockResponse({
            id: testOrderId,
            reference: 'TEST01',
            description: ':description:',
        });

        const response = await subject.update(testOrderId, 'TEST01', ':description:');

        expect(response.reference).toBe('TEST01');
        expect(response.description).toBe(':description:');
        expect(clientMock.getRequest()).toEqual({
            url: 'https://connect.pay.nl/v1/orders/00000000-1111-2222-3333-000000000000',
            options: {
                method: 'PATCH',
                json: {
                    description: ':description:',
                    reference: 'TEST01',
                },
            },
        });
    });

    const approvalTestCases: { name: string; method: 'approve' | 'decline' | 'capture' }[] = [
        {
            name: 'can approve an order in the verify stage',
            method: 'approve',
        },
        {
            name: 'can decline an order in the verify stage',
            method: 'decline',
        },
        {
            name: 'can capture an order in the verify stage',
            method: 'capture',
        },
    ];

    test.each(approvalTestCases)('$name', async function ({ method }) {
        const clientMock = new ApiClientMock();
        const subject = new OrderApi(clientMock.getMock());

        clientMock.mockResponse({ id: testOrderId, status: { code: 95, action: 'AUTHORIZE' } });

        const response = await subject[method](testOrderId);

        expect(response.status).toEqual({ code: 95, action: 'AUTHORIZE' });
        expect(clientMock.getRequest()).toEqual({
            url: `https://connect.pay.nl/v1/orders/00000000-1111-2222-3333-000000000000/${method}`,
            options: {
                method: 'PATCH',
            },
        });
    });

    it('can capture an order with an amount', async () => {
        const clientMock = new ApiClientMock();
        const subject = new OrderApi(clientMock.getMock());

        clientMock.mockResponse({
            id: testOrderId,
            status: { code: 95, action: 'AUTHORIZE' },
        });

        const response = await subject.captureWithAmount(testOrderId, 4242);

        expect(response.status).toEqual({ code: 95, action: 'AUTHORIZE' });
        expect(clientMock.getRequest()).toEqual({
            url: 'https://connect.pay.nl/v1/orders/00000000-1111-2222-3333-000000000000/capture/amount',
            options: {
                method: 'PATCH',
                json: {
                    amount: 4242,
                },
            },
        });
    });

    it('can capture an order with products', async () => {
        const clientMock = new ApiClientMock();
        const subject = new OrderApi(clientMock.getMock());

        clientMock.mockResponse({ id: testOrderId, status: { code: 95, action: 'AUTHORIZE' } });

        const productOne = { id: 'P1', quantity: 2 };
        const productTwo = { id: 'P2', quantity: 1 };

        const response = await subject.captureWithProducts(testOrderId, [productOne, productTwo]);

        expect(response.status).toEqual({ code: 95, action: 'AUTHORIZE' });
        expect(clientMock.getRequest()).toEqual({
            url: 'https://connect.pay.nl/v1/orders/00000000-1111-2222-3333-000000000000/capture/products',
            options: {
                method: 'PATCH',
                json: {
                    products: [productOne, productTwo],
                },
            },
        });
    });

    const paymentTestCases: { name: string; method: PaymentMethod }[] = [
        {
            name: 'gift card',
            method: { id: 1, input: { cardNumber: '123456789', pincode: '1234' } },
        },
        {
            name: 'pin',
            method: { id: 2, input: { terminalCode: '123456789', terminalPin: '1234' } },
        },
        {
            name: 'direct debit',
            method: {
                id: 3,
                input: {
                    firstName: 'Jane',
                    lastName: 'Doe',
                    email: 'jane@example.com',
                    city: 'City',
                    iban: 'EX001234567',
                    bic: 'BIC',
                    permissionGiven: true,
                },
            },
        },
        {
            name: 'Klarna',
            method: { id: 4, input: { countryCode: 'NL' } },
        },
        {
            name: 'Przelewy24',
            method: { id: 5, input: { email: 'jane@example.com' } },
        },
        {
            name: 'PayByBank',
            method: {
                id: 6,
                input: {
                    issuerId: '42',
                    country: 'NL',
                    debtorIban: 'EX001234567',
                    psuId: 'psuId',
                },
            },
        },
        {
            name: 'SprayPay',
            method: {
                id: 7,
                input: {
                    initials: 'J',
                    firstName: 'Jane',
                    lastName: 'Doe',
                    gender: 'FEMALE',
                    streetName: 'Street',
                    houseNumber: '42',
                    postalCode: '4242AB',
                    city: 'City',
                    country: 'NL',
                    email: 'jane@example.com',
                    phoneNumber: '0612345678',
                },
            },
        },
        {
            name: 'PayPal',
            method: { id: 1, input: { orderId: '42' } },
        },
    ];

    test.each(paymentTestCases)(
        'should accept a payment with method $name',
        async function ({ method }) {
            const clientMock = new ApiClientMock();
            const subject = new OrderApi(clientMock.getMock());

            clientMock.mockResponse(orderCreateResponse);

            const response = await subject.payment(testOrderId, method);

            expect(response).toEqual(orderCreateResponse);
            expect(clientMock.getRequest()).toEqual({
                url: 'https://connect.pay.nl/v1/orders/00000000-1111-2222-3333-000000000000/payments',
                options: {
                    method: 'POST',
                    json: {
                        paymentMethod: method,
                    },
                },
            });
        },
    );

    it('can void an order', async () => {
        const clientMock = new ApiClientMock();
        const subject = new OrderApi(clientMock.getMock());

        clientMock.mockResponse({ id: testOrderId, status: { code: -61, action: 'CANCEL' } });

        const response = await subject.void(testOrderId);

        expect(response.status).toEqual({ code: -61, action: 'CANCEL' });
        expect(clientMock.getRequest()).toEqual({
            url: 'https://connect.pay.nl/v1/orders/00000000-1111-2222-3333-000000000000/void',
            options: {
                method: 'PATCH',
            },
        });
    });

    it('can abort an order', async () => {
        const clientMock = new ApiClientMock();
        const subject = new OrderApi(clientMock.getMock());

        clientMock.mockResponse({ id: testOrderId, status: { code: -90, action: 'CANCEL' } });

        const response = await subject.abort(testOrderId);

        expect(response.status).toEqual({ code: -90, action: 'CANCEL' });
        expect(clientMock.getRequest()).toEqual({
            url: 'https://connect.pay.nl/v1/orders/00000000-1111-2222-3333-000000000000/abort',
            options: {
                method: 'PATCH',
            },
        });
    });
});
