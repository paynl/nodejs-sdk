"use strict";
var Observable_1 = require('rxjs/Observable');
var api_1 = require('./api/api');
var paymentmethod_1 = require('./result/paymentmethod');
var Paymentmethods = (function () {
    function Paymentmethods() {
    }
    Paymentmethods.reorderGetServiceData = function (data) {
        var baseUrl = data.service.basePath;
        var paymentmethods = {};
        for (var countrycode in data['countryOptionList']) {
            var country = data['countryOptionList'][countrycode];
            for (var paymentmethodId in country['paymentOptionList']) {
                var paymentmethod = country['paymentOptionList'][paymentmethodId];
                if (paymentmethodId != '10') {
                    // we only want iDEAL banks, for myBank and Giropay the list is quite large
                    delete paymentmethod['paymentOptionSubList'];
                }
                if (paymentmethod['paymentOptionSubList']) {
                    for (var bankId in paymentmethod['paymentOptionSubList']) {
                        var bank = paymentmethod['paymentOptionSubList'][bankId];
                        paymentmethod['paymentOptionSubList'][bankId]['img'] = baseUrl + bank['path'] + bank['img'];
                    }
                }
                paymentmethod['countries'] = [];
                paymentmethod['countries'].push({
                    id: country['id'],
                    name: country['visibleName']
                });
                if (paymentmethods[paymentmethodId]) {
                    paymentmethods[paymentmethodId]['countries'].push({
                        id: country['id'],
                        name: country['visibleName']
                    });
                }
                else {
                    paymentmethods[paymentmethodId] = paymentmethod;
                }
            }
        }
        return paymentmethods;
    };
    Paymentmethods.getList = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            api_1.Api.post('Transaction', 'getService', 5).map(function (result) {
                var paymentmethods = [];
                var reordered = _this.reorderGetServiceData(result);
                for (var paymentmethodId in reordered) {
                    var paymentmethod = reordered[paymentmethodId];
                    paymentmethods.push(new paymentmethod_1.Paymentmethod(paymentmethod));
                }
                return paymentmethods;
            }).subscribe(function (paymentmethods) {
                paymentmethods.forEach(function (paymentmethod) {
                    observer.next(paymentmethod);
                });
            }, function (error) { return observer.error(error); }, function () { return observer.complete(); });
        });
    };
    return Paymentmethods;
}());
exports.Paymentmethods = Paymentmethods;
//# sourceMappingURL=paymentmethods.js.map