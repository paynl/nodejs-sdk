export const fakeConfig = {
    code: 'SL-1234-5678',
    secret: ':secret:',
    testMode: false,
    name: 'Test',
    translations: {
        name: {
            nl_NL: 'Test',
        },
    },
    status: 'ACTIVE',
    merchant: {
        code: 'M-1234-5678',
        name: 'Test',
        status: 'INACTIVE',
    },
    category: {
        code: 'CY-1111-2222',
        name: 'Zakelijke diensten (B2B)',
    },
    mcc: 0,
    turnoverGroup: {
        code: 'CT-1111-2222',
        name: 'Test',
    },
    layout: null,
    tradeName: null,
    contactPhone: '+310000000000',
    contactEmail: 'info@test.nl',
    address: {
        code: 'CA-1111-2222',
        streetName: 'Straat',
        streetNumber: '1',
        zipCode: '1234 AB',
        city: 'Stad',
        countryCode: 'NL',
    },
    createdAt: '2025-07-23T09:50:20+02:00',
    createdBy: 'A-3333-4444',
    modifiedAt: '2025-07-23T09:51:55+02:00',
    modifiedBy: 'A-3333-4444',
    deletedAt: null,
    deletedBy: null,
    checkoutOptions: [],
    checkoutSequence: {
        default: {
            primary: [],
            secondary: [],
        },
    },
    checkoutTexts: [],
    encryptionKeys: [],
    tguList: [],
    _links: [
        {
            href: '/services/config?serviceId=SL-1234-5678',
            rel: 'self',
            type: 'GET',
        },
    ],
};
