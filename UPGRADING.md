# Upgrade guide

All notable (breaking) changes to this project will be documented in this file.

## From 1.2.0 to 2.0.0

As of version 2.0.0, the SDK can no longer create or update transactions using the old REST API.
All orders need to be created using the new [order API](https://developer.pay.nl/reference/api_create_order-1).
The `payNL.Orders.status()` method still supports fetching the status of a transaction.

To upgrade, all calls to the following methods need to be replaced with new Order API calls or are no longer available:
* `payNL.Transaction.start()`
* `payNL.Transaction.getStatus()`
* `payNL.Transaction.approve()`
* `payNL.Transaction.decline()`
* `payNL.Transaction.refund()`
* `payNL.Transaction.get()`
* `payNL.Instore.getTerminals()`

The following have different in- and outputs:
* `payNL.PaymentMethods.all()` (previously called `payNL.Paymentmethods.getList()`)
* `payNL.DirectDebit.add()`
* `payNL.DirectDebit.get()` 

## From 1.1.4 to 1.2.0

Pay.nl is moving from transaction operations to a Transaction Gateway Unit.
A new [order API](https://developer.pay.nl/reference/) is available for this and in the next major release will be the default for creating new orders on the Pay.nl platform.
In v1.2.0 of this SDK, the order API is available in addition to the transaction API so you can choose which one you want to use.

> [!IMPORTANT]
> Orders created with the transaction API will not be available in the new transaction gateway unit.
> The transaction status endpoint will be kept for backwards compatibility.

The new order API requires the PayNL SDK to be configured in a different way, beyond that the SDK is completely backwards compatible.

```diff
- var Paynl = require('paynl-sdk');
+ import { createPayNLClient } from 'paynl-sdk';

- Paynl.Config.setApiToken('your-api-token');
- Paynl.Config.setServiceId('SL-1234-5678');
+ const payNL = createPayNLClient({ apiToken: 'your-api-token', serviceId: 'SL-1234-5678' });

// You may keep using the old transaction API
await payNL.Transaction.start({...});

// Or start using the new order API
await payNL.Orders.create({...});
```
