import { ApiClientMock } from '../support/ApiClientMock';
import { DirectDebitApi } from '../../src/directdebit/DirectDebitApi';
import { fakeDirectDebit, fakeDirectDebitMandate } from '../support/fakeDirectDebit';
import { CreateDirectDebit, CreateMandate } from '../../src';

describe('DirectDebitApi', () => {
    it('can create a mandate', async () => {
        const clientMock = new ApiClientMock();
        const subject = new DirectDebitApi(clientMock.getMock());
        const createMandate = {
            description: fakeDirectDebitMandate.description,
            type: fakeDirectDebitMandate.type,
            amount: fakeDirectDebitMandate.amount,
        };

        clientMock.mockResponse(fakeDirectDebitMandate);

        const response = await subject.createMandate(createMandate as CreateMandate);

        expect(response).toEqual(fakeDirectDebitMandate);
        expect(clientMock.getRequest()).toEqual({
            url: 'https://rest.pay.nl/v2/directdebits/mandates',
            options: { method: 'POST', json: { serviceId: 'SL-1234-5678', ...createMandate } },
        });
    });

    it('can add a directdebit', async () => {
        const clientMock = new ApiClientMock();
        const subject = new DirectDebitApi(clientMock.getMock());
        const createDirectDebit = {
            mandateId: fakeDirectDebit.mandate.code,
            processDate: new Date(fakeDirectDebit.processDate),
            description: fakeDirectDebit.description,
            amount: fakeDirectDebit.amount,
        };

        clientMock.mockResponse(fakeDirectDebit);

        const response = await subject.add(createDirectDebit as CreateDirectDebit);

        expect(response).toEqual(fakeDirectDebit);
        expect(clientMock.getRequest()).toEqual({
            url: 'https://rest.pay.nl/v2/directdebits',
            options: { method: 'POST', json: createDirectDebit },
        });
    });

    it('can get a directdebit', async () => {
        const clientMock = new ApiClientMock();
        const subject = new DirectDebitApi(clientMock.getMock());

        clientMock.mockResponse(fakeDirectDebit);

        const response = await subject.get(fakeDirectDebit.mandate.code);

        expect(response).toEqual(fakeDirectDebit);
        expect(clientMock.getRequest()).toEqual({
            url: 'https://rest.pay.nl/v2/directdebits/IO-####-####-####',
            options: {},
        });
    });
});
