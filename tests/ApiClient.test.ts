import { ApiClient, ApiError } from '../src';
import { ConnectApiRequest } from '../src/ConnectApiRequest';
import { FetchMock } from './support/FetchMock';
import { mockClientOptions } from './support/mockClientOptions';
import { ApiResponse } from '../src/ApiResponse';

describe('Client', () => {
    it('should be able to do a request', async () => {
        const client = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({ status: 200, url: 'https://test.local/v1/orders' });

        const result = await client.request(new ConnectApiRequest('orders'));

        expect(result.http().url).toBe('https://test.local/v1/orders');
        expect(result.http().status).toBe(200);
    });

    it('should throw an error for an invalid request', async () => {
        const client = new ApiClient(mockClientOptions);
        const testRequest = new ConnectApiRequest('orders');

        const mockResponse = FetchMock.mockResponse({
            status: 400,
            statusText: 'Bad Request',
            url: 'https://test.local/v1/orders',
        });

        const expectedError = await ApiError.create(new ApiResponse(mockResponse));

        await expect(async () => await client.request(testRequest)).rejects.toThrow(expectedError);
    });
});
