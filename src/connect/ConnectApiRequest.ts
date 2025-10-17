import { ClientOptions } from './ApiClient';

export type FetchOptions = RequestInit & { json?: unknown };

export class ConnectApiRequest {
    private readonly url: string;
    private readonly host = 'https://connect.pay.nl';
    private readonly fetchOptions: FetchOptions;

    constructor(endpoint: string, fetchOptions: FetchOptions = {}) {
        this.url = `${this.host}/${endpoint}`;
        this.fetchOptions = fetchOptions;
    }

    getRequestInit(options: ClientOptions): RequestInit {
        const { json, ...fetchOptions } = this.fetchOptions;
        return {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${options.apiToken}`,
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
