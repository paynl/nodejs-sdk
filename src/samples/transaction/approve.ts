import * as Paynl from '../../index'

Paynl.Config.setApiToken('Your-api-token');
Paynl.Config.setServiceId('SL-6712-4510');

Paynl.Transaction.approve('715844054X85729e').subscribe(
    result => {
        console.log(result);
    },
    error => {
        console.log(error);
    },
    () => {
        console.log('complete');
    });