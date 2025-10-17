import { ApiError, GenericResponseBody } from '../src';
import { ApiResponse } from '../src/ApiResponse';

const BadRequestBody: GenericResponseBody = {
    type: 'https://developer.pay.nl/docs/error-codes',
    code: 'PAY-1400',
    title: 'Foute aanvraag',
    detail: '',
};

const BadRequestResponse = {
    statusText: 'Bad Request',
    status: 400,
    json: async () => BadRequestBody,
} as Response;

describe('ApiError', () => {
    it('should include HTTP status code and message', async () => {
        const subject = await ApiError.create(
            new ApiResponse(new Response(null, { status: 418, statusText: "I'm a teapot" })),
        );

        expect(subject.statusCode).toEqual(418);
        expect(subject.statusText).toEqual("I'm a teapot");
        expect(subject.toString()).toEqual("Error: HTTP 418 I'm a teapot");
        expect(subject.body).toEqual({
            code: 'unknown',
            detail: 'The API error response could not be parsed.',
            title: 'Unknown SDK error',
            type: 'unknown',
        });
    });

    it('should have the Pay.nl API error response', async () => {
        const expectedError = BadRequestBody;

        const subject = await ApiError.create(new ApiResponse(BadRequestResponse));

        expect(subject.body).toEqual(expectedError);
    });

    it('should have a generic error if the response can not be parsed', async () => {
        const expectedError = {
            type: 'unknown',
            code: 'unknown',
            title: 'Unknown SDK error',
            detail: 'The API error response could not be parsed.',
        };

        const mockResponse = {
            statusText: "I'm a teapot",
            status: 418,
            json: async () => {
                throw new Error('Cannot parse a teapot.');
                return;
            },
        } as Response;

        const subject = await ApiError.create(new ApiResponse(mockResponse));

        expect(subject.body).toEqual(expectedError);
    });
});
