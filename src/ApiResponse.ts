export interface ApiResponseInterface {
    http: () => Response;
    body: <T>() => Promise<T>;
}

export class ApiResponse implements ApiResponseInterface {
    private readonly httpResponse: Response;

    constructor(httpResponse: Response) {
        this.httpResponse = httpResponse;
    }

    http(): Response {
        return this.httpResponse;
    }

    async body<T>(): Promise<T> {
        return await this.httpResponse.json();
    }
}
