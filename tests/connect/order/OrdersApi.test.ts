import { OrderApi } from '../../../src/connect/order/OrderApi';
import { ApiClient } from '../../../src';
import { FetchMock } from '../support/FetchMock';
import { mockClientOptions } from '../support/mockClientOptions';

describe('OrdersApi', () => {
    it('be implemented', async () => {
        const clientMock = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({});

        const subject = new OrderApi(clientMock);

        await expect(async () => await subject.create()).rejects.toThrow();
    });
});
