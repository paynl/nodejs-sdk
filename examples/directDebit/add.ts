import * as Paynl from '../../src/index';

Paynl.Config.setApiToken('#Your token#');
Paynl.Config.setServiceId('SL-1234-5678');

Paynl.DirectDebit.add({
    amount: 0.01,
    bankaccountHolder: 'N Name',
    bankaccountNumber: 'NL00RABO0000012345678',

    // optional
    bankaccountBic: 'RABONL2U',
    processDate: new Date('2018-03-01'),
    description: 'Uw omschrijving',
    ipAddress: '192.168.10.1',
    email: 'a@a.nl',
    promotorId: 1234,
    tool: 'tool',
    info: 'info',
    object: 'object',
    extra1: 'extra1',
    extra2: 'extra2',
    extra3: 'extra3',
    currency: 'EUR',
    exchangeUrl: 'https://your-exchange.url',
}).subscribe(
    mandateId => {
        console.log('The mandateId is: ' + mandateId);
    },
    error => {
        console.error('Error ' + error);
    },
);
