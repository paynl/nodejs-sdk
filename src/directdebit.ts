/* eslint-disable */
// @ts-nocheck
import { DirectDebitInfoResponse } from './result/directdebit/info-response';
import { Observable } from 'rxjs/Observable';
import {
    DirectDebitAddRequest,
    DirectDebitAddRequestClass,
} from './datatypes/directdebit/add-request';
import { Api } from './api/api';

export class DirectDebit {
    static version = 3;

    static add(options: DirectDebitAddRequest): Observable<string> {
        return Observable.create(observable => {
            const request = new DirectDebitAddRequestClass(options);

            if (!request.amount) {
                observable.error('Amount is not set');
                return;
            }
            if (!request.bankaccountHolder) {
                observable.error('BankaccountHolder is not set');
                return;
            }
            if (!request.bankaccountNumber) {
                observable.error('BankaccountNumber is not set');
                return;
            }
            Api.post('DirectDebit', 'debitAdd', this.version, request.getForApi()).subscribe(
                result => {
                    observable.next(result['result']);
                    observable.complete();
                },
                error => {
                    observable.error(error);
                },
            );
        });
    }
    static get(mandateId: string): Observable<DirectDebitInfoResponse> {
        const data = {};
        data['mandateId'] = mandateId;
        return Api.post('DirectDebit', 'info', this.version, data).map(
            response => new DirectDebitInfoResponse(response.result),
        );
    }
}
