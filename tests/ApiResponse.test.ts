import { ApiResponse } from '../src/ApiResponse.ts';

describe('ApiResponse', () => {
    it('include http response and decode body', async () => {
        const givenResponse = new Response(JSON.stringify({ foo: 'bar' }), { status: 418 });

        const subject = new ApiResponse(givenResponse);

        expect(subject.http()).toEqual(givenResponse);
        expect(await subject.body()).toEqual({ foo: 'bar' });
    });
});
