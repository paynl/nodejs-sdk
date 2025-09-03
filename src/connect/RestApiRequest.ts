import { ClientOptions } from './ApiClient';

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
        const { json, ...fetchOptions } = this.fetchOptions;

        if (!options.ATCode) {
            throw new Error(
                'Initialising the PayNL client with an ATCode is required to access the REST API.',
            );
        }

        return {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${options.ATCode}:${options.apiToken}`)}`,
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
