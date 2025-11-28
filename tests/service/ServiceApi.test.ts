import { ApiClientMock } from '../support/ApiClientMock.ts';
import { fakeConfig } from '../support/fakeConfig.ts';
import { ServiceApi } from '../../src/service/ServiceApi.ts';

describe('ServiceApi', () => {
    it('can fetch service location config', async () => {
        const clientMock = new ApiClientMock();
        const subject = new ServiceApi(clientMock.getMock());

        clientMock.mockResponse(fakeConfig);

        const response = await subject.getConfig('SL-1234-5678');

        expect(response).toBe(fakeConfig);
        expect(clientMock.getRequest()).toEqual({
            url: 'https://connect.pay.nl/v2/services/config?serviceId=SL-1234-5678',
            options: {},
        });
    });
});
