import { OrderApi } from './order/OrderApi';
import { ApiClientInterface } from './ApiClient';
import { CoreApi } from './core/CoreApi';
import { DirectDebitApi } from './directdebit/DirectDebitApi';

export type PayNLProvider = {
    Orders: OrderApi;
    Client: ApiClientInterface;
    Core: CoreApi;
    DirectDebit: DirectDebitApi;
};
