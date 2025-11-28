import { ClientOptions } from './ApiClient.ts';

export type FetchOptions = RequestInit & { json?: unknown };

export class RestApiRequest {
    private readonly url: string;
    private readonly host = 'https://rest.pay.nl';
    private readonly fetchOptions: FetchOptions;

    constructor(endpoint: string, fetchOptions: FetchOptions = {}) {
        this.url = `${this.host}/${endpoint}`;
        this.fetchOptions = fetchOptions;
    }

    getRequestInit(options: ClientOptions): RequestInit {
        const { json, headers, ...fetchOptions } = this.fetchOptions;

        if (!options.username) {
            throw new Error(
                'Initialising the PayNL client with a username is required to access the REST API.',
            );
        }

        return {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${options.username}:${options.password}`)}`,
                ...headers,
            },
            body: json ? JSON.stringify(json) : undefined,
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
