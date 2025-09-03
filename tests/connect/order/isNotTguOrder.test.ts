import { isNotTguOrder } from '../../../src/connect/order/isNotTguOrder';

describe('isNotTguOrder', () => {
    const orderCases = [
        { given: '01405660087X15f1', expected: false },
        { given: '11405660087X15f1', expected: false },
        { given: '21405660087X15f1', expected: true },
        { given: '31405660087X15f1', expected: true },
        { given: '41405660087X15f1', expected: false },
        { given: '51405660087X15f1', expected: false },
        { given: '61405660087X15f1', expected: false },
        { given: '71405660087X15f1', expected: false },
        { given: '81405660087X15f1', expected: false },
        { given: '91405660087X15f1', expected: false },
        { given: '01405660087X15f1', expected: false },
        { given: 'EX-1234-1234-1234', expected: true },
    ];

    test.each(orderCases)('should return %p for given %p', ({ given, expected }) => {
        expect(isNotTguOrder(given)).toEqual(expected);
    });
});
