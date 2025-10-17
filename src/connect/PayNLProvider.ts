import { OrderApi } from './order/OrderApi';
import { ApiClientInterface } from './ApiClient';
import * as Paynl from '../index';
import { ServiceApi } from './service/ServiceApi';

export type PayNLProvider = {
    Orders: OrderApi;
    Client: ApiClientInterface;
    Service: ServiceApi;
    PaymentMethods: typeof Paynl.Paymentmethods;
    Instore: typeof Paynl.Instore;
    DirectDebit: typeof Paynl.DirectDebit;
    DynamicUUID: typeof Paynl.DynamicUUID;
    GiftCard: typeof Paynl.GiftCard;
    Transaction: typeof Paynl.Transaction;
};
