import { ConnectApiRequest } from './ConnectApiRequest.ts';
import { ApiResponse, ApiResponseInterface } from './ApiResponse.ts';
import { ApiError } from './ApiError.ts';
import { RestApiRequest } from './RestApiRequest.ts';

export type ClientOptions = {
    /**
     * This should be a token code formatted like `AT-1234-5678`
     */
    username?: string;
    password: string;
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
