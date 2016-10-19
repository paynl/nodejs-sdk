"use strict";
var Paynl = require('../index');
Paynl.Config.setApiToken('your-api-token');
Paynl.Config.setServiceId('SL-0123-4567');
Paynl.Transaction.start({
    amount: 20,
    returnUrl: "https://my-return-url.com",
    ipAddress: '10.20.30.40',
    enduser: {
        initials: 'AM',
        lastName: "Pieters",
        dob: new Date('1987-02-12'),
        emailAddress: 'my@email.com',
        gender: 'M',
        phoneNumber: '0612345678'
    },
    currency: 'EUR',
    exchangeUrl: 'https://my-exchange-url.com',
    paymentMethodId: 10,
    bankId: 1,
    testMode: true,
    description: 'Order 1234',
    expireDate: new Date('2016-10-19'),
    extra1: 'extra1',
    extra2: 'extra2',
    extra3: 'extra3',
    invoiceDate: new Date(),
    deliveryDate: new Date('2016-10-19'),
    address: {
        streetName: 'straat',
        houseNumber: '10',
        zipCode: '1234 AB',
        city: 'Enschede',
        countryCode: 'NL'
    },
    invoiceAddress: {
        streetName: 'straat',
        houseNumber: '10',
        zipCode: '1234 AB',
        city: 'Enschede',
        countryCode: 'NL',
        gender: 'F',
        initials: 'MC',
        lastName: 'lastName'
    },
    language: "NL",
    products: [
        {
            id: '1',
            name: "test",
            price: 10,
            qty: 1,
            tax: 2.1
        },
        {
            id: '2',
            name: "test2",
            price: 10,
            qty: 1,
            tax: 0.6
        },
    ]
}).subscribe(function (result) {
    console.log(result.paymentURL);
}, function (error) { return console.error('error ', error); }, function () { return console.log('complete'); });
//# sourceMappingURL=start_transaction.js.map