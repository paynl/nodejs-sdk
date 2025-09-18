import { ClientOptions, createPayNLClient } from '../src';

describe('createPayNLClient', () => {
    it('should return a client class with the given options', () => {
        const givenOptions: ClientOptions = {
            apiToken: 'your-api-token',
        };
        const expectedOptions = {
            apiToken: 'your-api-token',
        };

        const result = createPayNLClient(givenOptions);

        expect(result.Client.getOptions()).toEqual(expectedOptions);
    });
});
