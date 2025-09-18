import { ApiClientInterface } from '../ApiClient';
import { RestApiRequest } from '../RestApiRequest';
import { PaymentMethod } from './PaymentMethod';
import { LocaleCode } from '../shared';

type AllPaymentMethodsResponse = {
    total: number;
    paymentMethods: PaymentMethod[];
};

export class CoreApi {
    constructor(private readonly apiClient: ApiClientInterface) {}

    /**
     * Get all payment methods.
     * @see https://developer.pay.nl/reference/payment_method_payment_methods_get
     */
    async PaymentMethods(locale: LocaleCode = 'en_GB') {
        const response = await this.apiClient.request(
            new RestApiRequest('v2/paymentmethods', {
                headers: {
                    'Accept-Language': locale,
                },
            }),
        );

        return await response.body<AllPaymentMethodsResponse>();
    }
}
