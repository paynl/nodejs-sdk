import { ApiClient, GenericResponseBody } from '../../../src';
import { FetchMock } from '../support/FetchMock';
import { mockClientOptions } from '../support/mockClientOptions';
import { orderCreateResponse } from '../support/fakeOrder';
import { OrderApi } from '../../../src/connect/order/OrderApi';
import { fakeCreateOrderOptions } from '../support/fakeCreateOrderOptions';

const testOrderId = '00000000-1111-2222-3333-000000000000';

describe('OrderApi', () => {
    it('can send order:create with minimal data', async () => {
        const clientMock = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({
            status: 200,
            body: orderCreateResponse,
        });

        const subject = new OrderApi(clientMock);

        const response = await subject.create({
            amount: {
                value: 1000,
                currency: 'EUR',
            },
        });

        expect(response).toBe(orderCreateResponse);
    });

    it('can send order:create with all data', async () => {
        const clientMock = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({
            status: 200,
            body: orderCreateResponse,
        });

        const subject = new OrderApi(clientMock);

        const response = await subject.create(fakeCreateOrderOptions);

        expect(response).toEqual(orderCreateResponse);
    });

    it('can handle validation error for order:create', async () => {
        const clientMock = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({
            status: 422,
            statusText: 'Unprocessable Entity',
            body: {
                type: 'https://developer.pay.nl/docs/error-codes',
                code: 'PAY-1422',
                title: 'Unable to process the request',
                detail: 'field: cannot be empty',
                violations: [
                    {
                        propertyPath: 'field',
                        message: 'cannot be empty',
                    },
                ],
            } satisfies GenericResponseBody,
        });

        const subject = new OrderApi(clientMock);

        await expect(
            async () =>
                await subject.create({
                    amount: {
                        value: 1000,
                        currency: 'EUR',
                    },
                }),
        ).rejects.toThrow('HTTP 422 Unprocessable Entity');
    });

    it('can get the order status', async () => {
        const clientMock = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({
            status: 200,
            body: {
                id: testOrderId,
                status: {
                    code: 100,
                    action: 'PAID',
                },
            },
        });

        const subject = new OrderApi(clientMock);

        const response = await subject.status(testOrderId);

        expect(response.code).toBe(100);
        expect(response.action).toBe('PAID');
    });

    it('can update the order reference and description', async () => {
        const clientMock = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({
            status: 200,
            body: {
                id: testOrderId,
                reference: 'TEST01',
                description: ':description:',
            },
        });

        const subject = new OrderApi(clientMock);

        const response = await subject.update(testOrderId, 'TEST01', ':description:');

        expect(response.reference).toBe('TEST01');
        expect(response.description).toBe(':description:');
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
        const clientMock = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({
            status: 200,
            body: { id: testOrderId, status: { code: 95, action: 'AUTHORIZE' } },
        });

        const subject = new OrderApi(clientMock);

        const response = await subject[method](testOrderId);

        expect(response.status).toEqual({ code: 95, action: 'AUTHORIZE' });
    });
});
