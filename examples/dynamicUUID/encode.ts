import * as Paynl from '../../src/index';

const secret = 'abcdef1234567890abcdef1234567890abcdef12';
const slcode = 'SL-5261-6001';
const reference = 'INV001';

Paynl.DynamicUUID.encode(slcode, secret, reference).subscribe(
    function (result) {
        console.log('UUID: ' + result);
    },
    function (error) {
        console.log('Encoding failed: ' + error);
    },
);
