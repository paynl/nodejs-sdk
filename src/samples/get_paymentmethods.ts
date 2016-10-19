import * as Paynl from '../index';

Paynl.Config.setApiToken('your-api-token');
Paynl.Config.setServiceId('SL-0123-4567');

Paynl.Paymentmethods.getList().subscribe(
    paymentmethods => {
        paymentmethods.forEach(paymentmethod => {
            console.log(paymentmethod.id, paymentmethod.visibleName);
        });
    });