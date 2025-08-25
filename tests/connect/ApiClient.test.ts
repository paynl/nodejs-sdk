import { ApiClient, ApiError } from '../../src';
import { ApiRequest } from '../../src/connect/ApiRequest';
import { FetchMock } from './support/FetchMock';
import { mockClientOptions } from './support/mockClientOptions';
import { ApiResponse } from '../../src/connect/ApiResponse';

describe('Client', () => {
    it('should be able to do a request', async () => {
        const client = new ApiClient(mockClientOptions);
        const testRequest = new ApiRequest('orders', client.getOptions());

        FetchMock.mockResponse({ status: 200, url: 'https://test.local/v1/orders' });

        const result = await client.request(testRequest);

        expect(result.http().url).toBe('https://test.local/v1/orders');
        expect(result.http().status).toBe(200);
    });

    it('should throw an error for an invalid request', async () => {
        const client = new ApiClient(mockClientOptions);
        const testRequest = new ApiRequest('orders', client.getOptions());

        const mockResponse = FetchMock.mockResponse({
            status: 400,
            statusText: 'Bad Request',
            url: 'https://test.local/v1/orders',
        });

        const expectedError = new ApiError(new ApiResponse(mockResponse));

        await expect(async () => await client.request(testRequest)).rejects.toThrow(expectedError);
    });
});
