import { ApiRequest } from './ApiRequest';
import { ApiResponse } from './ApiResponse';
import { ApiError } from './ApiError';

export type ClientOptions = {
    apiToken: string;
    serviceId: string;
    host?: string;
};

export interface ApiClientInterface {
    request: (request: ApiRequest) => Promise<ApiResponse>;
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

    async request(request: ApiRequest): Promise<ApiResponse> {
        const response = await fetch(request.getUrl(), request.getRequestInit());

        if (!response.ok) {
            throw new ApiError(new ApiResponse(response));
        }

        return new ApiResponse(response);
    }
}
