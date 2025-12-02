import { OrderApi } from './order/OrderApi.ts';
import { ApiClientInterface } from './ApiClient.ts';
import { CoreApi } from './core/CoreApi.ts';
import { DirectDebitApi } from './directdebit/DirectDebitApi.ts';
import { ServiceApi } from './service/ServiceApi.ts';

export type PayNLProvider = {
    Orders: OrderApi;
    Client: ApiClientInterface;
    Core: CoreApi;
    Service: ServiceApi;
    DirectDebit: DirectDebitApi;
};
