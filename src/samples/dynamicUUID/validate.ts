import * as Paynl from '../../index'

Paynl.DynamicUUID.validate('#your UUID#', '#your secret#')
    .subscribe(
        function (result) {
            console.log('Validation result: ' + result);
        },
        function (error) {
            console.log('Validation failed: ' + error);
        }
    );