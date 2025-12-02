import { ClientOptions, createPayNLClient } from '../src/index.ts';

describe('createPayNLClient', () => {
    it('should return a client class with the given options', () => {
        const givenOptions: ClientOptions = {
            password: 'your-api-token',
        };
        const expectedOptions = {
            password: 'your-api-token',
        };

        const result = createPayNLClient(givenOptions);

        expect(result.Client.getOptions()).toEqual(expectedOptions);
    });
});
