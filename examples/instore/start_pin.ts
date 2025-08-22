/* eslint-disable */
// @ts-nocheck

import * as Paynl from '../../src/index';

Paynl.Config.setApiToken('0123456789asdfghjkllqwertewwqrt');
Paynl.Config.setServiceId('SL-0123-4567');

// Start transaction and send to the terminal
Paynl.Transaction.start({
    amount: 0.01,
    paymentMethodId: 1927, //The payment method id for PIN
    //returnUrl and ipAddres make no sense for instore payments, but are mandatory
    returnUrl: 'not_applicable',
    ipAddress: '10.20.30.40',
    terminalId: 'TH-0123-4567',
}).subscribe(
    //when the transaction is started, get the status
    transaction => getStatus(transaction.terminalStatusUrl),
);

function getStatus(statusUrl: string) {
    Paynl.Instore.getTransactionStatus(statusUrl).subscribe(
        status => {
            console.log('isFinal: ', status.isFinal);
            console.log('status: ', status.status);
            console.log('txId: ', status.txId);
            console.log('terminal: ', status.terminal);
            console.log('ssai: ', status.ssai);
            console.log('isCanceled: ', status.isCanceled);
            console.log('isApproved: ', status.isApproved);
            console.log('isError: ', status.isError);
            console.log('needsSignature: ', status.needsSignature);
            console.log('amount: ', status.amount);
            console.log('approvalId: ', status.approvalId);
            console.log('carBrandIdentifier: ', status.cardBrandIdentifier);
            console.log('cardBrandLabelName: ', status.cardBrandLabelName);
            console.log('incidentCode: ', status.incidentCode);
            console.log('incidentCodeText: ', status.incidentCodeText);
            console.log('receipt: ', status.receipt);
        },
        error => console.error(error),
        () => {
            console.log('Completed');
        },
    );
}
