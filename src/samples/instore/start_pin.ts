import * as Paynl from '../../index';

Paynl.Config.setApiToken('0123456789asdfghjkllqwertewwqrt');
Paynl.Config.setServiceId('SL-0123-4567');

// Get the terminals by calling getTerminals
let terminalId = "TH-0123-4567";

// First we need to start a transaction
Paynl.Transaction.start({
    amount: 0.01,
    paymentMethodId: 1729, 
    //returnUrl and ipAddres make no sense for instore payments, but are mandatory
    returnUrl: 'not_applicable',
    ipAddress: '10.20.30.40'
}).subscribe(
    // the resulting transaction will be sent to a terminal
    transaction => sendToTerminal(transaction.transactionId, terminalId)
);

function sendToTerminal(transactionId, terminalId) {
    var lastStatus = null;
    Paynl.Instore.payment(transactionId, terminalId).subscribe(
        //this gets called every 3 seconds
        status => { 
            //save the last status so we can access it in the complete function
            lastStatus = status; 
            console.log(status.state + ' Percentage: ' + status.percentage);
        },
        error => console.trace(error),
        () => {
            // if the transaction has reached a final state this function gets called
            if (lastStatus.state == 'approved') {
                // fetch the receipt of the transaction
                fetchReceipt(lastStatus.hash);
            } else {
                console.log('Payment was not completed');
            }
        }
    );
}

function fetchReceipt(hash: string) {
    Paynl.Instore.getReceipt(hash).subscribe(receipt => {
        console.log(receipt.receipt);
    }, error => {
        console.trace(error);
    });
}