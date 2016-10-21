"use strict";
var Paynl = require('../../index');
Paynl.Config.setApiToken('Your-api-token');
Paynl.Config.setServiceId('SL-6712-4510');
Paynl.Transaction.refund({
    transactionId: '715844054X85729e',
    processDate: new Date('2016-10-20'),
    description: '',
    amount: 1
}).subscribe(function (result) {
    console.log(result);
}, function (error) {
    console.log(error);
}, function () {
    console.log('complete');
});
//# sourceMappingURL=refund.js.map