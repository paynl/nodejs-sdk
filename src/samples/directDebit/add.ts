import * as Paynl from '../../index'

Paynl.Config.setApiToken('#Your token#');
Paynl.Config.setServiceId('SL-1234-5678');

Paynl.DirectDebit.add({
    amount: 0.01,
    bankaccountHolder: 'N Name',
    bankaccountNumber: 'NL00RABO0000012345678'
}).subscribe(mandateId => {
        console.log('The mandateId is: '+mandateId);
    },
    error => {
        console.error('Error '+error);
    }

);