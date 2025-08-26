import { ApiClient, ApiError } from '../../src';
import { ApiRequest } from '../../src/connect/ApiRequest';
import { FetchMock } from './support/FetchMock';
import { mockClientOptions } from './support/mockClientOptions';
import { ApiResponse } from '../../src/connect/ApiResponse';

describe('Client', () => {
    it('should be able to do a GET request', async () => {
        const client = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({ status: 200, url: 'https://test.local/v1/orders' });

        const result = await client.get('orders');

        expect(result.http().url).toBe('https://test.local/v1/orders');
        expect(result.http().status).toBe(200);
    });

    it('should be able to do a POST request', async () => {
        const client = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({ status: 200, url: 'https://test.local/v1/orders' });

        const result = await client.post('orders', { amount: { value: 1000, currency: 'EUR' } });

        expect(result.http().url).toBe('https://test.local/v1/orders');
        expect(result.http().status).toBe(200);
    });

    it('should be able to do a PATCH request', async () => {
        const client = new ApiClient(mockClientOptions);

        FetchMock.mockResponse({ status: 200, url: 'https://test.local/v1/orders' });

        const result = await client.patch('orders', { amount: { value: 1000, currency: 'EUR' } });

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

        const expectedError = await ApiError.create(new ApiResponse(mockResponse));

        await expect(async () => await client.request(testRequest)).rejects.toThrow(expectedError);
    });
});
