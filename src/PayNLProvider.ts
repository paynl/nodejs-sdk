import { OrderApi } from './order/OrderApi';
import { ApiClientInterface } from './ApiClient';
import { CoreApi } from './core/CoreApi';
import { DirectDebitApi } from './directdebit/DirectDebitApi';
import { ServiceApi } from './service/ServiceApi';

export type PayNLProvider = {
    Orders: OrderApi;
    Client: ApiClientInterface;
    Core: CoreApi;
    Service: ServiceApi;
    DirectDebit: DirectDebitApi;
};
