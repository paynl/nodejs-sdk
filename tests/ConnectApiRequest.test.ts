import { ConnectApiRequest } from '../src/ConnectApiRequest.ts';
import { mockClientOptions } from './support/mockClientOptions.ts';

describe('ConnectApiRequest', () => {
    it('should have the right options', () => {
        const subject = new ConnectApiRequest('v1/patch-test', { method: 'PATCH' });

        const expectedOptions = {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic QVQtMTIzNC01Njc4OjphcGktdG9rZW46',
                'Content-Type': 'application/json',
            },
        };

        expect(subject.getUrl()).toBe('https://connect.pay.nl/v1/patch-test');
        expect(subject.getRequestInit(mockClientOptions)).toEqual(expectedOptions);
    });

    it('can send json data in body', () => {
        const subject = new ConnectApiRequest('v1/create-json', {
            method: 'POST',
            json: { foo: 'bar' },
        });

        const expectedOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic QVQtMTIzNC01Njc4OjphcGktdG9rZW46',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ foo: 'bar' }),
        };

        expect(subject.getUrl()).toBe('https://connect.pay.nl/v1/create-json');
        expect(subject.getRequestInit(mockClientOptions)).toEqual(expectedOptions);
    });

    it('can send request with only password', () => {
        const subject = new ConnectApiRequest('v1/create-json', {
            method: 'POST',
            json: { foo: 'bar' },
        });

        const expectedOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer :api-token:',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ foo: 'bar' }),
        };

        expect(subject.getUrl()).toBe('https://connect.pay.nl/v1/create-json');
        expect(subject.getRequestInit({ password: ':api-token:' })).toEqual(expectedOptions);
    });

    it('can send form data in body', () => {
        const subject = new ConnectApiRequest('v1/create-form', {
            method: 'POST',
            body: new FormData(),
        });

        const expectedOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Basic QVQtMTIzNC01Njc4OjphcGktdG9rZW46',
                'Content-Type': 'application/json',
            },
            body: new FormData(),
        };

        expect(subject.getUrl()).toBe('https://connect.pay.nl/v1/create-form');
        expect(subject.getRequestInit(mockClientOptions)).toEqual(expectedOptions);
    });
});
