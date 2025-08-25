import { ApiRequest } from '../../src/connect/ApiRequest';
import { mockClientOptions } from './support/mockClientOptions';

describe('ApiRequest', () => {
    it('should have the right options', () => {
        const subject = new ApiRequest('patch-test', mockClientOptions, { method: 'PATCH' });

        const expectedOptions = {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer :api-token:',
                'Content-Type': 'application/json',
            },
        };

        expect(subject.getUrl()).toBe('https://test.local/v1/patch-test');
        expect(subject.getRequestInit()).toEqual(expectedOptions);
    });
});
