"use strict";
var Paynl = require('../../index');
Paynl.Config.setApiToken('Your-api-token');
Paynl.Config.setServiceId('SL-6712-4510');
Paynl.Transaction.get('715844054X85729e').subscribe(function (result) {
    console.log(result);
}, function (error) { return console.log(error); });
//# sourceMappingURL=get.js.map