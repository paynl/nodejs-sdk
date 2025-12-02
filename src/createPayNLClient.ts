import { ClientOptions, ApiClient } from './ApiClient.ts';
import { PayNLProvider } from './PayNLProvider.ts';
import { OrderApi } from './order/OrderApi.ts';
import { CoreApi } from './core/CoreApi.ts';
import { DirectDebitApi } from './directdebit/DirectDebitApi.ts';
import { ServiceApi } from './service/ServiceApi.ts';

export function createPayNLClient(options: ClientOptions): PayNLProvider {
    const apiClient = new ApiClient(options);

    return {
        Client: apiClient,
        Orders: new OrderApi(apiClient),
        Core: new CoreApi(apiClient),
        Service: new ServiceApi(apiClient),
        DirectDebit: new DirectDebitApi(apiClient),
    };
}
