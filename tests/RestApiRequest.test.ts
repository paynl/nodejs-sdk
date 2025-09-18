import { RestApiRequest } from '../src/RestApiRequest';
import { mockClientOptions } from './support/mockClientOptions';

describe('RestApiRequest', () => {
    it('should have the right options', () => {
        const subject = new RestApiRequest('v1/patch-test');

        const expectedOptions = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Basic QVQtMTIzNC01Njc4OjphcGktdG9rZW46',
            },
        };

        expect(subject.getFetchOptions()).toEqual({});
        expect(subject.getUrl()).toBe('https://rest.pay.nl/v1/patch-test');
        expect(subject.getRequestInit(mockClientOptions)).toEqual(expectedOptions);
    });

    it('can send json data in body', () => {
        const subject = new RestApiRequest('v1/create-json', {
            method: 'POST',
            json: { foo: 'bar' },
        });

        const expectedOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Basic QVQtMTIzNC01Njc4OjphcGktdG9rZW46',
            },
            body: JSON.stringify({ foo: 'bar' }),
        };

        expect(subject.getFetchOptions()).toEqual({ method: 'POST', json: { foo: 'bar' } });
        expect(subject.getUrl()).toBe('https://rest.pay.nl/v1/create-json');
        expect(subject.getRequestInit(mockClientOptions)).toEqual(expectedOptions);
    });

    it('should throw an error if the AT code is not provided', async () => {
        const subject = new RestApiRequest('v1/create-json');

        await expect(async () =>
            subject.getRequestInit({
                password: ':api-token:',
            }),
        ).rejects.toThrow(
            new Error(
                'Initialising the PayNL client with a username is required to access the REST API.',
            ),
        );
    });

    it('should add new headers', () => {
        const subject = new RestApiRequest('v1/header-test', {
            headers: { 'X-Custom-Header': 'custom-value' },
        });

        const expectedOptions = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Basic QVQtMTIzNC01Njc4OjphcGktdG9rZW46',
                'X-Custom-Header': 'custom-value',
            },
        };

        expect(subject.getUrl()).toBe('https://rest.pay.nl/v1/header-test');
        expect(subject.getRequestInit(mockClientOptions)).toEqual(expectedOptions);
    });
});
