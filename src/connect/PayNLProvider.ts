import { OrderApi } from './order/OrderApi';
import { ApiClientInterface } from './ApiClient';
import * as Paynl from '../index';
import { PaymentMethodsApi } from './core/PaymentMethodsApi';

export type PayNLProvider = {
    Orders: OrderApi;
    Client: ApiClientInterface;
    PaymentMethods: PaymentMethodsApi;
    Instore: typeof Paynl.Instore;
    DirectDebit: typeof Paynl.DirectDebit;
    DynamicUUID: typeof Paynl.DynamicUUID;
    GiftCard: typeof Paynl.GiftCard;
};
