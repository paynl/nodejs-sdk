import { ApiResponse } from './ApiResponse';

export type GenericResponseBody = {
    type: string;
    code: string;
    title: string;
    detail: string;
    violations?: { propertyPath: string; message: string }[];
};

const sdkError: GenericResponseBody = {
    type: 'unknown',
    code: 'unknown',
    title: 'Unknown SDK error',
    detail: 'The API error response could not be parsed.',
};

export class ApiError extends Error {
    private constructor(
        public readonly statusCode: number,
        public readonly statusText: string,
        public readonly body: GenericResponseBody,
    ) {
        super(`HTTP ${statusCode} ${statusText}`);
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static async create(apiResponse: ApiResponse): Promise<ApiError> {
        try {
            const body = await apiResponse.body<GenericResponseBody>();

            return new ApiError(apiResponse.http().status, apiResponse.http().statusText, body);
        } catch {
            return new ApiError(apiResponse.http().status, apiResponse.http().statusText, sdkError);
        }
    }

    static createStatic(
        statusCode: number,
        statusText: string,
        body: GenericResponseBody,
    ): ApiError {
        return new ApiError(statusCode, statusText, body);
    }
}
