import { ApiClientInterface } from '../ApiClient';
import { ConnectApiRequest } from '../ConnectApiRequest';
import { ServiceConfig } from './ServiceConfig';

export class ServiceApi {
    constructor(private readonly apiClient: ApiClientInterface) {}

    /**
     * Get the complete configuration of a service location. you can use this to create your own checkout.
     * @see https://developer.pay.nl/reference/get_services-config
     */
    async getConfig(serviceId: string): Promise<ServiceConfig> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v2/services/config?serviceId=${serviceId}`),
        );
        return await response.body<ServiceConfig>();
    }
}
