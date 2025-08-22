import * as Paynl from '../../src/index';

Paynl.Config.setApiToken('#Your token#');
Paynl.Config.setServiceId('SL-1234-5678');

Paynl.DirectDebit.get('IO-5289-5134-1580').subscribe(transaction => {
    console.log(transaction);
});
