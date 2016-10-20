"use strict";
var Paynl = require('../../index');
Paynl.Config.setApiToken('your-api-token');
Paynl.Config.setServiceId('SL-0123-4567');
Paynl.Transaction.get('715844054X85729e').subscribe(function (result) {
    console.log(result.saleData.orderData);
}, function (error) {
    console.log(error);
});
//# sourceMappingURL=get.js.map