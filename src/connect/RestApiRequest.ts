import { ClientOptions } from './ApiClient';

export type FetchOptions = RequestInit & { json?: unknown };

export class RestApiRequest {
    private readonly url: string;
    private readonly host = 'https://rest-api.pay.nl';
    private readonly fetchOptions: FetchOptions;

    constructor(endpoint: string, fetchOptions: FetchOptions = {}) {
        this.url = `${this.host}/${endpoint}`;
        this.fetchOptions = fetchOptions;
    }

    getRequestInit(options: ClientOptions): RequestInit {
        const { json, ...fetchOptions } = this.fetchOptions;

        const auth = {
            token: options.apiToken,
            serviceId: options.serviceId,
        };

        const data = json ? { ...auth, ...json } : { ...auth };

        return {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
            ...fetchOptions,
        };
    }

    getUrl(): string {
        return this.url;
    }

    getFetchOptions(): FetchOptions {
        return this.fetchOptions;
    }
}
