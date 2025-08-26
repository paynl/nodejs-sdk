import { ApiError } from '../../src';
import { ApiResponse } from '../../src/connect/ApiResponse';

const BadRequestBody = {
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

        expect(subject.statusCode()).toEqual(418);
        expect(subject.statusText()).toEqual("I'm a teapot");
        expect(subject.toString()).toEqual("Error: 418 I'm a teapot");
    });

    it('should have the Pay.nl API error response', async () => {
        const expectedError = BadRequestBody;

        const subject = await ApiError.create(new ApiResponse(BadRequestResponse));

        expect(await subject.body()).toEqual(expectedError);
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

        expect(await subject.body()).toEqual(expectedError);
    });

    it('should allow to fetch error body twice', async () => {
        const subject = await ApiError.create(new ApiResponse(BadRequestResponse));

        const firstTime = await subject.body();
        const secondTime = await subject.body();

        expect(firstTime).toEqual(BadRequestBody);
        expect(secondTime).toEqual(BadRequestBody);
        expect(firstTime).toEqual(secondTime);
    });
});
