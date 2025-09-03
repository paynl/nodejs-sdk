import { PaymentMethod } from '../../../src';

export const fakePaymentMethod: PaymentMethod = {
    id: 1,
    name: 'iDEAL',
    description:
        'Met iDEAL kunt  u met een Nederlandse bankrekening vertrouwd, veilig en gemakkelijk betalen via internetbankieren van uw eigen bank.',
    sequence: 1,
    public: true,
    status: 'active',
    image: '/payment_methods/1.svg',
    translations: {
        name: {
            en_GB: 'iDEAL',
        },
        description: {
            en_GB: 'Met iDEAL kunt u met een Nederlandse bankrekening vertrouwd, veilig en gemakkelijk betalen via internetbankieren van uw eigen bank.',
        },
    },
    targetCountries: ['NL'],
    paymentProfiles: [
        {
            id: 10,
            name: 'iDEAL',
            publicName: 'iDEAL',
            public: true,
            selectable: true,
            paymentMethodGroup: 'ONLINEBANK',
            paymentType: 'SALE',
            customerIdType: 'IBAN',
            riskCategory: 'LOW',
            translations: [],
            issuers: [],
            categories: [],
            createdAt: '2007-04-06T16:24:29+02:00',
            modifiedAt: '2025-09-02T03:39:12+02:00',
            deletedAt: null,
        },
    ],
    createdAt: '2018-05-16T14:16:58+02:00',
    modifiedAt: null,
    deletedAt: null,
};
