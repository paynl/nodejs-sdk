# PAY.nl NodeJS SDK
SDK for PAY.nl allowing you to manage your PAY.nl transactions in nodeJS

## Installation
```bash
npm install paynl-sdk --save
```

## Usage

- Import 'paynl-sdk' in your file.
- [Register](https://signup.pay.nl/welcome) for a PAY.nl account at.
- In the PAY.nl admin panel, navigate to Manage -> Services and click the SL-code on the left.
- From the popup use the API token and service location ID, and configure them in the SDK.

## Examples
Some of the basic examples are listed here, for the full list of examples, please take a look at the examples directory [here](https://github.com/paynl/nodejs-sdk/tree/master/src/examples).

All examples start with importing the `paynl-sdk` and creating a client using the API token and service location ID.

```typescript
import { createPayNLClient } from 'paynl-sdk';

const payNL = createPayNLClient({ apiToken: '****************************************', serviceId: 'SL-####-####' });
```

## Service Config

To fetch the configuration of a given service location. This can be used to create your own checkout.

```typescript
const config = await payNL.Service.getConfig('SL-####-####');
```

## Orders

Orders use the new Transaction Gateway Unit API. View the [examples](https://github.com/paynl/nodejs-sdk/tree/master/src/examples/connect) or [online documentation](https://developer.pay.nl/reference/api_create_order-1) for a complete overview of what is possible.

### Creating an order

The most minimal request to create an order includes the amount:

```typescript
const order = await payNL.Orders.create({
    amount: {
        value: 1000, // in cents
        currency: 'EUR',
    },
});
```

For testing purposes you may enable the sandbox mode:

```typescript
const order = await payNL.Orders.create({
    amount: {
        value: 1000, // in cents
        currency: 'EUR',
    },
    integration: {
       test: true,
    },
});
```

### Fetching an order

After an order is created you should store its ID, which you need to fetch or change it later on.
To fetch an order or just its status:

```typescript
const orderId = '########-####-####-####-############';
const order = await payNL.Orders.get(orderId);
const orderStatus = await payNL.Orders.status(orderId);
```

## Basic transactions

> [!IMPORTANT]
> Orders created with the transaction API will not be available in the new transaction gateway unit.
> In the upcoming v2.0 release the `payNL.Transaction` methods will no longer be available. The transaction status endpoint will be kept for backwards compatibility.
> We recommend that you start using orders instead of transactions.

### Getting the available payment methods
This example shows how to fetch a list of the available payment methods.
The method ``` payNL.Paymentmethods.getList() ``` returns an observable array.
For more information about observables see [reactivex.io](http://reactivex.io/rxjs/)

```typescript
payNL.Paymentmethods.getList().forEach(
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
The full version with all supported options is located [here](https://github.com/paynl/nodejs-sdk/tree/master/src/samples/transaction/start.ts)

```typescript
payNL.Transaction.start({
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
```typescript
payNL.Transaction.get('123456789X12345e').subscribe(
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

```typescript
payNL.Instore.getTerminals()
    .forEach(function (terminal) {
    console.log(terminal.id + ' ' + terminal.name);
})
    .catch(function (error) { return console.error(error); });
```

### Starting an instore transaction
An instore transaction is started in the same way as a normal transaction with the addition of a terminalId.
After the transaction has been started, you can use the terminalStatusUrl to get the status of the transaction.

```typescript
// Start transaction and send to the terminal
payNL.Transaction.start({
    amount: 0.01,
    paymentMethodId: 1927,
    //returnUrl and ipAddres are not used for instore payments, but are mandatory
    returnUrl: "not_applicable",
    ipAddress: "10.20.30.40",
    terminalId: "TH-####-####"
}).subscribe(
    //when the transaction is started, get the status
    function (transaction) { 
        getStatus(transaction.terminalStatusUrl); 
    }
);
function getStatus(statusUrl) {
    payNL.Instore.getTransactionStatus(statusUrl).subscribe(function (status) {
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
        console.log("cardBrandIdentifier: ", status.cardBrandIdentifier);
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

```typescript
payNL.DirectDebit.add({
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

```typescript
payNL.DirectDebit.get('IO-####-####-####').subscribe(function (transaction) {
    console.log(transaction);
});
```
