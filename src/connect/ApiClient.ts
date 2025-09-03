import { ConnectApiRequest } from './ConnectApiRequest';
import { ApiResponse, ApiResponseInterface } from './ApiResponse';
import { ApiError } from './ApiError';
import { RestApiRequest } from './RestApiRequest';

export type ClientOptions = {
    apiToken: string;
    serviceId: string;
    ATCode?: string;
};

type ApiRequest = ConnectApiRequest | RestApiRequest;

export interface ApiClientInterface {
    request: (request: ApiRequest) => Promise<ApiResponseInterface>;
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

    async request(request: ApiRequest): Promise<ApiResponseInterface> {
        const response = await fetch(request.getUrl(), request.getRequestInit(this.options));

        if (!response.ok) {
            throw await ApiError.create(new ApiResponse(response));
        }

        return new ApiResponse(response);
    }
}
