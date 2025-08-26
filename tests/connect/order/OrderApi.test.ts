import { OrderApi } from '../../../src/connect/order/OrderApi';
import { ApiClient } from '../../../src';
import { FetchMock } from '../support/FetchMock';
import { mockClientOptions } from '../support/mockClientOptions';

describe('OrderApi', () => {
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
});
