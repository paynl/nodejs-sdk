import * as Paynl from '../../index'

Paynl.DynamicUUID.decode('#your UUID#')
    .subscribe(
        function (result) {
            console.log('decoded serviceId: ' + result.serviceId);
            console.log('decoded reference: ' + result.reference);
        },
        function (error) {
            console.error(error);
        }
    );
