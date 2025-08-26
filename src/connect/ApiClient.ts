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
    get: (endpoint: string) => Promise<ApiResponse>;
    post: (endpoint: string, body: unknown) => Promise<ApiResponse>;
    patch: (endpoint: string, body: unknown) => Promise<ApiResponse>;
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
            throw await ApiError.create(new ApiResponse(response));
        }

        return new ApiResponse(response);
    }

    get(endpoint: string): Promise<ApiResponse> {
        return this.createRequest('GET', endpoint);
    }

    post(endpoint: string, body: unknown): Promise<ApiResponse> {
        return this.createRequest('POST', endpoint, body);
    }

    patch(endpoint: string, body: unknown): Promise<ApiResponse> {
        return this.createRequest('PATCH', endpoint, body);
    }

    private createRequest(method: string, endpoint: string, body?: unknown): Promise<ApiResponse> {
        return this.request(
            new ApiRequest(endpoint, this.getOptions(), {
                method: method,
                body: body ? JSON.stringify(body) : undefined,
            }),
        );
    }
}
