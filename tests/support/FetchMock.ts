type MockResponseOptions = {
    status?: number;
    statusText?: string;
    url?: string;
    headers?: Headers;
    body?: object;
};

export class FetchMock {
    static mockResponse(options: MockResponseOptions): Response {
        const body = options.body ? options.body : null;

        const response = {
            ...options,
            ok: options.status && options.status >= 200 && options.status < 300,
            json: () => Promise.resolve(body),
        } as Response;

        global.fetch = jest.fn(() => Promise.resolve(response));

        return response;
    }
}
