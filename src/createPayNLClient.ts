import { ClientOptions, ApiClient } from './ApiClient';
import { PayNLProvider } from './PayNLProvider';
import { OrderApi } from './order/OrderApi';
import { CoreApi } from './core/CoreApi';
import { DirectDebitApi } from './directdebit/DirectDebitApi';
import { ServiceApi } from './service/ServiceApi';

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
