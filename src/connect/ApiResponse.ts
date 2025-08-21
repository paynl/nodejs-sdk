export class ApiResponse {
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
