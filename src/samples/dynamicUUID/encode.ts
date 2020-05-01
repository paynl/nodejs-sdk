import * as Paynl from '../../index'

var secret = 'abcdef1234567890abcdef1234567890abcdef12';
var slcode = 'SL-5261-6001';
var reference = 'INV001';

Paynl.DynamicUUID.encode(slcode, secret, reference)
    .subscribe(
        function (result) {
            console.log('UUID: ' + result);
        },
        function (error) {
            console.error('Error: ' + error);
        }
    );
