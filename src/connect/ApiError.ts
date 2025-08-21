import { ApiResponse } from './ApiResponse';

type GenericResponseBody = {
    type: string;
    code: string;
    title: string;
    detail: string;
};

const sdkError: GenericResponseBody = {
    type: 'unknown',
    code: 'unknown',
    title: 'Unknown SDK error',
    detail: 'The API error response could not be parsed.',
};

export class ApiError extends Error {
    private readonly apiResponse: ApiResponse;
    private responseBody: GenericResponseBody | undefined;

    constructor(apiResponse: ApiResponse) {
        super(`${apiResponse.http().status} ${apiResponse.http().statusText}`);
        Object.setPrototypeOf(this, ApiError.prototype);
        this.apiResponse = apiResponse;
    }

    async body(): Promise<GenericResponseBody> {
        if (this.responseBody) {
            return this.responseBody;
        }

        try {
            this.responseBody = await this.apiResponse.body<GenericResponseBody>();
            return this.responseBody;
        } catch {
            this.responseBody = sdkError;
            return sdkError;
        }
    }

    statusCode(): number {
        return this.apiResponse.http().status;
    }

    statusText(): string {
        return this.apiResponse.http().statusText;
    }
}
