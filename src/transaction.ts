/* eslint-disable */
// @ts-nocheck
import { StartResult } from './result/transaction/start';
import { TransactionResult } from './result/transaction';
import { TransactionStart, TransactionStartClass } from './datatypes/transaction-start';
import { Refund, RefundClass } from './datatypes/refund';
import { Api } from './api/api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Transaction {
    static version = 8;

    /** @deprecated will be replaced by orders in the next release (see UPGRADING.md) **/
    static start(options: TransactionStart): Observable<StartResult> {
        return Observable.create(observable => {
            // Prepare the data
            const startData = new TransactionStartClass(options);

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

            Api.post('transaction', 'start', this.version, startData.getForApi())
                .map(result => new StartResult(result))
                .subscribe(
                    result => observable.next(result),
                    error => observable.error(error),
                    () => observable.complete(),
                );
        });
    }

    /** @deprecated will be replaced by orders in the next release (see UPGRADING.md) **/
    static get(transactionId: string): Observable<TransactionResult> {
        if (!transactionId) {
            return Observable.throw('transactionId is not set');
        }
        return Api.post('Transaction', 'info', this.version, { transactionId: transactionId }).map(
            data => {
                data['transactionId'] = transactionId;
                return new TransactionResult(data);
            },
        );
    }

    /** @deprecated will be replaced by orders in the next release (see UPGRADING.md) **/
    static approve(transactionId): Observable<boolean> {
        return Api.post('Transaction', 'approve', this.version, { orderId: transactionId }).map(
            result => result.request.result == '1',
        );
    }

    /** @deprecated will be replaced by orders in the next release (see UPGRADING.md) **/
    static decline(transactionId): Observable<boolean> {
        return Api.post('Transaction', 'decline', this.version, { orderId: transactionId }).map(
            result => result.request.result == '1',
        );
    }

    /** @deprecated will be replaced by orders in the next release (see UPGRADING.md) **/
    static refund(options: Refund): Observable<string> {
        const data = new RefundClass(options).getForApi();
        if (!options.transactionId) return Observable.throw('transactionId is required');

        return Api.post('Transaction', 'refund', this.version, data).map(
            result => result['refundId'],
        );
    }
}
