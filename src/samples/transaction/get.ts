import * as Paynl from '../../index'

Paynl.Config.setApiToken('your-api-token');
Paynl.Config.setServiceId('SL-0123-4567');

Paynl.Transaction.get('715844054X85729e').subscribe(
    result => {
        console.log(result.saleData.orderData);
    },
    error => {
        console.log(error);
    });