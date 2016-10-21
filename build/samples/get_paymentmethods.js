"use strict";
var Paynl = require('../index');
Paynl.Config.setApiToken('Your-api-token');
Paynl.Config.setServiceId('SL-6712-4510');
Paynl.Paymentmethods.getList().forEach(function (paymentmethod) {
    console.log(paymentmethod.id + ' ' + paymentmethod.visibleName);
})
    .catch(function (error) {
    console.error(error);
});
//# sourceMappingURL=get_paymentmethods.js.map