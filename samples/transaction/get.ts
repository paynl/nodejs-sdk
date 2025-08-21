import * as Paynl from '../../index'

Paynl.Config.setApiToken('Your-api-token');
Paynl.Config.setServiceId('SL-6712-4510');

Paynl.Transaction.get('715844054X85729e').subscribe(
    result => {
        // some examples of what you can do with the result
        if(result.isPaid()){
            console.log('The transaction is paid');

             // refund a part of the transaction
            result.refund({
                amount: 0.5,
                description: '50 cents refund'
            });            
        }
        if(result.isCanceled()){
            console.log('Tranasaction is canceled, restock the items');
        }
        if(result.isBeingVerified()){
            console.log('Transaction needs to be verified first, possible fraud');

            result.decline(); //decline the transaction
            result.approve(); //approve the transaction 
        }
    },
    error => console.log(error)
);