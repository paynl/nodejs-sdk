import { ApiClientInterface } from '../ApiClient';
import { ApiRequest } from '../ApiRequest';

export class OrderApi {
    private readonly apiClient: ApiClientInterface;

    constructor(apiClient: ApiClientInterface) {
        this.apiClient = apiClient;
    }

    async create() {
        await this.apiClient.request(new ApiRequest('orders', this.apiClient.getOptions()));
        throw new Error('Not implemented');
    }
}
