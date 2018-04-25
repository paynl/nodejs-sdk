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

### Starting an instore transaction
An instore transaction is started in the same way as a normal transaction with the addition of a terminalId.
After the transaction has been started, you can use the terminalStatusUrl to get the status of the transaction.

```javascript
// Start transaction and send to the terminal
Paynl.Transaction.start({
    amount: 0.01,
    paymentMethodId: 1927,
    //returnUrl and ipAddres make no sense for instore payments, but are mandatory
    returnUrl: "not_applicable",
    ipAddress: "10.20.30.40",
    terminalId: "TH-0123-4567"
}).subscribe(
    //when the transaction is started, get the status
    function (transaction) { 
        getStatus(transaction.terminalStatusUrl); 
    }
);
function getStatus(statusUrl) {
    Paynl.Instore.getTransactionStatus(statusUrl).subscribe(function (status) {
        console.log("isFinal: ", status.isFinal);
        console.log("status: ", status.status);
        console.log("txId: ", status.txId);
        console.log("terminal: ", status.terminal);
        console.log("ssai: ", status.ssai);
        console.log("isCanceled: ", status.isCanceled);
        console.log("isApproved: ", status.isApproved);
        console.log("isError: ", status.isError);
        console.log("needsSignature: ", status.needsSignature);
        console.log("amount: ", status.amount);
        console.log("approvalId: ", status.approvalId);
        console.log("carBrandIdentifier: ", status.cardBrandIdentifier);
        console.log("cardBrandLabelName: ", status.cardBrandLabelName);
        console.log("incidentCode: ", status.incidentCode);
        console.log("incidentCodeText: ", status.incidentCodeText);
        console.log("receipt: ", status.receipt);
    }, function (error) { 
        console.error(error); 
    }, function () {
        console.log("Completed");
    });
}
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
