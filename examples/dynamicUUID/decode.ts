import * as Paynl from '../../src/index';

Paynl.DynamicUUID.decode('#your UUID#').subscribe(
    function (result) {
        console.log('Decoded serviceId: ' + result.serviceId);
        console.log('Decoded reference: ' + result.reference);
    },
    function (error) {
        console.log('Decode failed: ' + error);
    },
);
