import { ConnectApiRequest } from './ConnectApiRequest';
import { ApiResponse } from './ApiResponse';
import { ApiError } from './ApiError';

export type ClientOptions = {
    apiToken: string;
    serviceId: string;
};

export interface ApiClientInterface {
    request: (request: ConnectApiRequest) => Promise<ApiResponse>;
    getOptions: () => ClientOptions;
}

export class ApiClient implements ApiClientInterface {
    private readonly options: ClientOptions;

    constructor(options: ClientOptions) {
        this.options = options;
    }

    getOptions(): ClientOptions {
        return this.options;
    }

    async request(request: ConnectApiRequest): Promise<ApiResponse> {
        const response = await fetch(request.getUrl(), request.getRequestInit(this.options));

        if (!response.ok) {
            throw await ApiError.create(new ApiResponse(response));
        }

        return new ApiResponse(response);
    }
}
