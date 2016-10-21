import * as Paynl from '../../index'

Paynl.Config.setApiToken('Your-api-token');
Paynl.Config.setServiceId('SL-6712-4510');

Paynl.Transaction.get('715844054X85729e').subscribe(
    result => {
        result.refund().subscribe(
            result => console.log(result),
            error => console.error(error)
        );
    },
    error => console.log(error)
);