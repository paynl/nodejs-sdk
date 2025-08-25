import { ClientOptions } from './ApiClient';

export class ApiRequest {
    private readonly url: string;
    private readonly fetchOptions: RequestInit;

    constructor(endpoint: string, options: ClientOptions, fetchOptions: RequestInit = {}) {
        this.url = `${options.host}/${endpoint}`;
        this.fetchOptions = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${options.apiToken}`,
            },
            ...fetchOptions,
        };
    }

    getRequestInit(): RequestInit {
        return this.fetchOptions;
    }

    getUrl(): string {
        return this.url;
    }
}
