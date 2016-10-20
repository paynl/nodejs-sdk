"use strict";
var start_1 = require('./result/transaction/start');
var transaction_1 = require('./result/transaction');
var transaction_start_1 = require('./datatypes/transaction-start');
var api_1 = require('./api/api');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
var Transaction = (function () {
    function Transaction() {
    }
    Transaction.start = function (options) {
        var _this = this;
        return Observable_1.Observable.create(function (observable) {
            // Prepare the data
            var startData = new transaction_start_1.TransactionStartClass(options);
            if (!startData.amount) {
                observable.error('Amount is not set');
                observable.complete();
                return;
            }
            if (!startData.returnUrl) {
                observable.error('returnUrl is not set');
                observable.complete();
                return;
            }
            if (!startData.ipAddress) {
                observable.error('ipAddress is not set');
                observable.complete();
                return;
            }
            api_1.Api.post('transaction', 'start', _this.version, startData.getForApi()).map(function (result) { return new start_1.StartResult(result.transaction); }).subscribe(function (result) { return observable.next(result); }, function (error) { return observable.error(error); }, function () { return observable.complete(); });
        });
    };
    Transaction.get = function (transactionId) {
        if (!transactionId) {
            return Observable_1.Observable.throw('transactionId is not set');
        }
        return api_1.Api.post('Transaction', 'info', this.version, { transactionId: transactionId })
            .map(function (data) {
            return new transaction_1.TransactionResult(data);
        });
    };
    Transaction.version = 5;
    return Transaction;
}());
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map