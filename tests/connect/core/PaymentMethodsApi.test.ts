import { ApiClientMock } from '../support/ApiClientMock';
import { PaymentMethodsApi } from '../../../src/connect/core/PaymentMethodsApi';
import { fakePaymentMethod } from '../support/fakePaymentMethods';

describe('PaymentMethodsApi', () => {
    it('should return a list of all payment methods', async () => {
        const clientMock = new ApiClientMock();
        const subject = new PaymentMethodsApi(clientMock.getMock());

        clientMock.mockResponse({ total: 1, paymentMethods: [fakePaymentMethod] });

        const response = await subject.all('nl_NL');

        expect(response.paymentMethods).toEqual([fakePaymentMethod]);
        expect(clientMock.getRequest()).toEqual({
            url: 'https://rest.pay.nl/v2/paymentmethods',
            options: { headers: { 'Accept-Language': 'nl_NL' } },
        });
    });
});
