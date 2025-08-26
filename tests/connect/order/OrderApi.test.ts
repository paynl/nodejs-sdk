import { ApiClient, GenericResponseBody } from '../../../src';
import { FetchMock } from '../support/FetchMock';
import { mockClientOptions } from '../support/mockClientOptions';
import { orderCreateResponse } from '../support/fakeOrder';
import { OrderApi } from '../../../src/connect/order/OrderApi';

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

        const response = await subject.create({
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
        });

        expect(response).toBe(orderCreateResponse);
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
});
