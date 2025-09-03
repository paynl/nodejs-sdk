import { ApiClientInterface } from '../ApiClient';
import { RestApiRequest } from '../RestApiRequest';
import { PaymentMethod } from './PaymentMethod';
import { LocaleCode } from '../Locale';

type AllResponse = {
    total: number;
    paymentMethods: PaymentMethod[];
};

export class PaymentMethodsApi {
    constructor(private readonly apiClient: ApiClientInterface) {}

    /**
     * Get all payment methods.
     * @see https://developer.pay.nl/reference/payment_method_payment_methods_get
     */
    async all(locale: LocaleCode = 'en_GB') {
        const response = await this.apiClient.request(
            new RestApiRequest('v2/paymentmethods', {
                headers: {
                    'Accept-Language': locale,
                },
            }),
        );

        return await response.body<AllResponse>();
    }
}
