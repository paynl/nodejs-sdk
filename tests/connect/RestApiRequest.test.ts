import { RestApiRequest } from '../../src/connect/RestApiRequest';
import { mockClientOptions } from './support/mockClientOptions';

describe('RestApiRequest', () => {
    it('should have the right options', () => {
        const subject = new RestApiRequest('v1/patch-test');

        const expectedOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: mockClientOptions.apiToken,
                serviceId: mockClientOptions.serviceId,
            }),
        };

        expect(subject.getFetchOptions()).toEqual({});
        expect(subject.getUrl()).toBe('https://rest-api.pay.nl/v1/patch-test');
        expect(subject.getRequestInit(mockClientOptions)).toEqual(expectedOptions);
    });

    it('can send json data in body', () => {
        const subject = new RestApiRequest('v1/create-json', { json: { foo: 'bar' } });

        const expectedOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: mockClientOptions.apiToken,
                serviceId: mockClientOptions.serviceId,
                foo: 'bar',
            }),
        };

        expect(subject.getFetchOptions()).toEqual({ json: { foo: 'bar' } });
        expect(subject.getUrl()).toBe('https://rest-api.pay.nl/v1/create-json');
        expect(subject.getRequestInit(mockClientOptions)).toEqual(expectedOptions);
    });
});
