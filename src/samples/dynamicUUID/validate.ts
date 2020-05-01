import * as Paynl from '../../index'

Paynl.DynamicUUID.validate('#your UUID#', '#your seceret#')
    .subscribe(
        function (result) {
            console.log('Validation result: ' + result);
        },
        function (error) {
            console.error(error);
        }
    );