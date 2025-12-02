import { ApiClient, ApiClientInterface, ApiError } from '../../src/index.ts';
import { mockClientOptions } from './mockClientOptions.ts';
import { ConnectApiRequest } from '../../src/ConnectApiRequest.ts';
import { RestApiRequest } from '../../src/RestApiRequest.ts';

export class ApiClientMock {
    private readonly clientMock: ApiClient;
    private request: ConnectApiRequest | RestApiRequest | null = null;

    constructor() {
        this.clientMock = new ApiClient(mockClientOptions);
    }

    getMock(): ApiClientInterface {
        return this.clientMock;
    }

    mockResponse(response: unknown): void {
        jest.spyOn(this.clientMock, 'request').mockImplementation(
            async (request: ConnectApiRequest | RestApiRequest) => {
                this.request = request;

                return {
                    http: jest.fn(),
                    body: jest.fn().mockReturnValue(response),
                };
            },
        );
    }

    mockError(error: ApiError): void {
        jest.spyOn(this.clientMock, 'request').mockImplementation(
            async (request: ConnectApiRequest | RestApiRequest) => {
                this.request = request;

                throw error;
            },
        );
    }

    getRequest(): unknown {
        if (!this.request) {
            throw new Error('No request was made');
        }

        return {
            url: this.request.getUrl(),
            options: this.request.getFetchOptions(),
        };
    }
}
