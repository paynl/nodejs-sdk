"use strict";
var Paynl = require('../index');
Paynl.Config.setApiToken('your-api-token');
Paynl.Config.setServiceId('SL-0123-4567');
Paynl.Paymentmethods.getList().subscribe(function (paymentmethods) {
    paymentmethods.forEach(function (paymentmethod) {
        console.log(paymentmethod.id, paymentmethod.visibleName);
    });
});
//# sourceMappingURL=get_paymentmethods.js.map