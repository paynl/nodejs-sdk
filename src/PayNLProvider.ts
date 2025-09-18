import { OrderApi } from './order/OrderApi';
import { ApiClientInterface } from './ApiClient';
import { PaymentMethodsApi } from './core/PaymentMethodsApi';
import { DirectDebitApi } from './directdebit/DirectDebitApi';
import { ServiceApi } from './service/ServiceApi';

export type PayNLProvider = {
    Orders: OrderApi;
    Client: ApiClientInterface;
    Service: ServiceApi;
    PaymentMethods: PaymentMethodsApi;
    DirectDebit: DirectDebitApi;
};
