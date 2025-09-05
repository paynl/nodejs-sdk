import { ClientOptions, ApiClient } from './ApiClient';
import { PayNLProvider } from './PayNLProvider';
import { OrderApi } from './order/OrderApi';
import { PaymentMethodsApi } from './core/PaymentMethodsApi';
import { DirectDebitApi } from './directdebit/DirectDebitApi';

export function createPayNLClient(options: ClientOptions): PayNLProvider {
    const apiClient = new ApiClient(options);

    return {
        Client: apiClient,
        Orders: new OrderApi(apiClient),
        PaymentMethods: new PaymentMethodsApi(apiClient),
        DirectDebit: new DirectDebitApi(apiClient),
    };
}
