import { ApiClientInterface } from '../ApiClient';
import { RestApiRequest } from '../RestApiRequest';
import { CreateDirectDebit, DirectDebit } from './DirectDebit';
import { CreateMandate, Mandate } from './Mandate';

export class DirectDebitApi {
    constructor(private readonly apiClient: ApiClientInterface) {}

    /**
     * You always need a mandate for a direct debit transaction.
     * You can create a mandate for a single direct debit transaction, for a recurring or flexible direct debits.
     * @see https://developer.pay.nl/reference/post_directdebits-mandates
     */
    async createMandate(mandate: CreateMandate): Promise<Mandate> {
        const response = await this.apiClient.request(
            new RestApiRequest('v2/directdebits/mandates', {
                method: 'POST',
                json: {
                    serviceId: this.apiClient.getOptions().serviceId,
                    ...mandate,
                },
            }),
        );
        return await response.body<Mandate>();
    }

    /**
     * Initiate a DirectDebit for a Mandate. Only applicable for “Flexible” mandates.
     * @see https://developer.pay.nl/reference/post_directdebits
     */
    async add(directDebit: CreateDirectDebit): Promise<DirectDebit> {
        const response = await this.apiClient.request(
            new RestApiRequest('v2/directdebits', { method: 'POST', json: directDebit }),
        );
        return await response.body();
    }

    /**
     * Get a specific directdebit transaction
     * @see https://developer.pay.nl/reference/get_directdebits-directdebitid
     */
    async get(directDebitId: string) {
        const response = await this.apiClient.request(
            new RestApiRequest(`v2/directdebits/${directDebitId}`),
        );
        return await response.body();
    }
}
