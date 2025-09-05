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

## Orders

Orders use the new Transaction Gateway Unit API. View the [examples](https://github.com/paynl/nodejs-sdk/tree/master/examples) or [online documentation](https://developer.pay.nl/reference/api_create_order-1) for a complete overview of what is possible.

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

## Direct Debit (Incasso)

### Creating a new Direct Debit

This SDK can also add direct debit transactions. In order to do so, you need to create a mandate first.

```typescript
const mandate = await payNL.DirectDebit.createMandate({
    amount: { value: 1000, currency: 'EUR' },
    description: 'example description',
    type: 'FLEXIBLE',
});

const directDebit = await payNL.DirectDebit.add({
    mandateId: mandate.code,
    processDate: new Date('2025-10-10'),
    description: 'Test direct debit',
    amount: {
        value: 1000,
        currency: 'EUR',
    },
});
```

### Fetching a Direct Debit transaction

Fetch a DirectDebit transaction to check the status.

```typescript
const directDebit = await payNL.DirectDebit.get('IO-####-####-####');
```
