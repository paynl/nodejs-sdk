"use strict";
const start_1 = require('./result/transaction/start');
const transaction_start_1 = require('./datatypes/transaction-start');
const api_1 = require('./api/api');
const Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
class Transaction {
    static start(options) {
        return Observable_1.Observable.create((observable) => {
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
            api_1.Api.post('transaction', 'start', this.version, startData.getForApi()).map((result) => new start_1.StartResult(result.transaction)).subscribe((result) => observable.next(result), (error) => observable.error(error), () => observable.complete());
        });
    }
}
Transaction.version = 5;
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map