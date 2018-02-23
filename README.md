# Pay.nl NodeJS SDK
SDK for pay.nl allowing you to manage your pay.nl transactions in nodeJS

## Installation
```bash
npm install paynl-sdk --save
```

## Usage

- Require 'paynl-sdk' in your file.
```javascript
var Paynl = require('paynl-sdk');
```
- Register for a pay.nl account at: [pay.nl/registreren](https://pay.nl/registreren)
- In the pay.nl admin, navigate to Manage -> Services and click the SL-code on the left.
- From the popup use the apitoken and serviceId, and configure them in the SDK.
```javascript
Paynl.Config.setApiToken('Your-api-token');
Paynl.Config.setServiceId('SL-0123-4567');

```
## Examples
Some of the basic examples are listed here, for the full list of examples, please take a look at the samples directory [here](https://github.com/paynl/nodejs-sdk/tree/master/src/samples)

All examples start with requiring paynl-sdk and setting the apitoken and serviceId.

```javascript
var Paynl = require('paynl-sdk');

Paynl.Config.setApiToken('Your-api-token');
Paynl.Config.setServiceId('SL-0123-4567');
```
## Basic transactions

### Getting the available payment methods
This example shows how to fetch a list of the available payment methods.
The method ``` Paynl.Paymentmethods.getList() ``` returns an observable array.
For more information about observables see [reactivex.io](http://reactivex.io/rxjs/)

```javascript
Paynl.Paymentmethods.getList().forEach(
    function(paymentmethod) {
        console.log(paymentmethod.id + ' ' + paymentmethod.visibleName);
    }
)
.catch(error => {
    console.error(error)
});
```
### Starting a transaction
This example shows the minimum required attributes to start a transaction.
The full version with all supported options is located [here](https://github.com/paynl/nodejs-sdk/blob/master/build/samples/transaction/start.js)

```javascript
Paynl.Transaction.start({
    //the amount in euro
    amount: 19.95,
    
    //we redirect the user back to this url after the payment
    returnUrl: "https://my-return-url.com/return",
    
    //the ip address of the user
    ipAddress: '10.20.30.40' 
})
.subscribe(
  function (result) {
    //redirect the user to this url to complete the payment
    console.log(result.paymentURL); 
    
    // the transactionId, use this to fetch the transaction later
    console.log(result.transactionId);
  }, 
  function (error) {
    console.error(error); 
  }
);
```

### Fetching a transaction
The following example shows how to fetch a transaction.
```javascript
Paynl.Transaction.get('715844054X85729e').subscribe(
  function(result){
    // some examples of what you can do with the result
    if (result.isPaid()) {
        console.log('The transaction is paid');
        // refund a part of the transaction
        result.refund({
            amount: 0.5,
            description: '50 cents refund'
        });
    }
    if (result.isCanceled()) {
        console.log('Tranasaction is canceled, restock the items');
    }
    if (result.isBeingVerified()) {
        console.log('Transaction needs to be verified first, possible fraud');
        result.decline(); //decline the transaction
        result.approve(); //approve the transaction 
    }
  },
  function(error){
    console.error(error);
  }
);
```

## Instore payments (pin)

### Fetching available terminals

Before you can send a transaction, you need to know which terminal to send the transaction to.

```javascript
Paynl.Instore.getTerminals()
    .forEach(function (terminal) {
    console.log(terminal.id + ' ' + terminal.name);
})
    .catch(function (error) { return console.error(error); });
```

### Sending a transaction to a terminal

First you need to start a transaction.
After the transaction is started and you have a transactionId, you can send the transaction to the terminal.
You can get the terminalId from the example above.

```javascript
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
            Paynl.Instore.getReceipt(hash).subscribe(receipt => {
            console.log(receipt.receipt);
        }, error => {
            console.trace(error);
        });

        } else {
            console.log('Payment was not completed');
        }
    }
);

    
```

## Direct Debit (Incasso)

### Creating a new Direct Debit

This SDK can also add direct debit transactions.
Only amount, bankaccountHolder and bankaccountNumber are mandatory, the rest of the arguments are optional.

```javascript
Paynl.DirectDebit.add({
    amount: 0.01,
    bankaccountHolder: "N Name",
    bankaccountNumber: "NL00RABO0000012345678",
    // optional
    bankaccountBic: "RABONL2U",
    processDate: new Date("2018-03-01"),
    description: "Uw omschrijving",
    ipAddress: "192.168.10.1",
    email: "a@a.nl",
    promotorId: 1234,
    tool: "tool",
    info: "info",
    object: "object",
    extra1: "extra1",
    extra2: "extra2",
    extra3: "extra3",
    currency: "EUR",
    exchangeUrl: "https://your-exchange.url",
}).subscribe(function (mandateId) {
    console.log("The mandateId is: " + mandateId);
}, function (error) {
    console.error("Error " + error);
});

```

### Fetching a Direct Debit transaction

Fetch a DirectDebit transaction to fetch the status.

```javascript
Paynl.DirectDebit.get('IO-5289-5134-1580').subscribe(function (transaction) {
    console.log(transaction);
});
```