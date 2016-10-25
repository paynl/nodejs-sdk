# Pay.nl NodeJS SDK
SDK for pay.nl allowing you to manage your pay.nl transactions in nodeJS

##Installation
```bash
npm install paynl-sdk --save
```

##Usage

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
Some of the basic examples are listed here, for the full list of examples, please take a look at the samples directory [here](https://github.com/paynl/nodejs-sdk/tree/master/build/samples)

All examples start with requiring paynl-sdk and setting the apitoken and serviceId.

```javascript
var Paynl = require('paynl-sdk');

Paynl.Config.setApiToken('Your-api-token');
Paynl.Config.setServiceId('SL-0123-4567');
```

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