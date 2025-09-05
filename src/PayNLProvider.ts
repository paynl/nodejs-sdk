import { OrderApi } from './order/OrderApi';
import { ApiClientInterface } from './ApiClient';
import { PaymentMethodsApi } from './core/PaymentMethodsApi';
import { DirectDebitApi } from './directdebit/DirectDebitApi';

export type PayNLProvider = {
    Orders: OrderApi;
    Client: ApiClientInterface;
    PaymentMethods: PaymentMethodsApi;
    DirectDebit: DirectDebitApi;
};
