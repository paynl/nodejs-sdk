import { OrderApi } from '../../../src/connect/order/OrderApi';
import { ApiClient } from '../../../src';
import { FetchMock } from '../support/FetchMock';
import { mockClientOptions } from '../support/mockClientOptions';

describe('OrdersApi', () => {
    it('can send order:create', async () => {
        const clientMock = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({
            status: 200,
            body: {
                id: '68ac5742-4223-812b-1225-4060087323de',
            },
        });

        const subject = new OrderApi(clientMock);

        const response = await subject.create({
            amount: {
                value: 1000,
                currency: 'EUR',
            },
        });

        expect(response.id).toBe('68ac5742-4223-812b-1225-4060087323de');
    });

    it('cannot send order:create with invalid reference', async () => {
        const clientMock = new ApiClient(mockClientOptions);

        const subject = new OrderApi(clientMock);

        await expect(async () => {
            await subject.create({
                reference: 'ABC-123',
                amount: {
                    value: 1000,
                    currency: 'EUR',
                },
            });
        }).rejects.toThrow('The order reference may only contain alphanumeric characters.');
    });
});
