import { Observable } from 'rxjs/Observable';
import { TransactionStatus } from './result/instore/transactionStatus';

import { Terminal } from './result/instore/getTerminals';
import { Status } from './result/instore/status';
import { Receipt } from './result/instore/receipt';
import * as request from 'request';
import { Api } from './api/api';
import 'rxjs/add/operator/map'

export class Instore {
    static getTerminals(): Observable<Terminal> {
        return Observable.create(observer => {
            Api.post('Instore', 'getAllTerminals', 2)
                .map(result => result.terminals)
                .subscribe(
                    terminals => {
                        for (let index in terminals) {
                            let terminal = new Terminal(terminals[index]);
                            if (terminal.ecrProtocol == 'WEB') {
                                observer.next(terminal);
                            }
                        }
                    },
                    error => {
                        observer.error(error)
                    },
                    () => observer.complete()
                );
        });
    }
    private static pollStatus(observer, hash, count = 1) {
        if (count == 20) {
            observer.complete();
            return;
        }
        setTimeout(() => {
            Api.post('Instore', 'status', 2, { hash: hash }).subscribe(
                result => {
                    let status: Status = {
                        state: result.transaction.state,
                        percentage: result.progress.percentage,
                        hash: hash
                    }
                    observer.next(status);
                    if (status.state == 'init') {
                        this.pollStatus(observer, hash, count + 1);
                    } else {
                        observer.complete();
                    }
                },
                error => observer.error(),
            );
        }, 3000);
    }
    static payment(transactionId: string, terminalId: string): Observable<Status> {
        return Observable.create(observer => {
            let data = {
                transactionId: transactionId,
                terminalId: terminalId
            }
            Api.post('Instore', 'payment', 2, data).subscribe(
                result => {
                    let status: Status = {
                        state: result.transaction.state,
                        percentage: result.progress.percentage,
                        hash: result.transaction.terminalHash
                    }
                    observer.next(status);
                    let terminalHash = result.transaction.terminalHash;
                    this.pollStatus(observer, terminalHash);
                },
                error => observer.error(error)
            );
        });
    }
    static getReceipt(hash: string): Observable<Receipt> {
        return Observable.create(observer => {
            let data = {
                hash: hash
            };
            Api.post('Instore', 'getTransactionTicket', 2, data).subscribe(
                result => {
                    let receiptData = Buffer.from(result.receipt, 'base64').toString();
                    let receipt: Receipt = {
                        approvalId: result.approvalId,
                        cardBrandId: result.cardBrandId,
                        cardBrandName: result.cardBrandName,
                        paymentProfileId: result.paymentProfileId,
                        receipt: receiptData
                    };
                    observer.next(receipt);
                    observer.complete();
                },
                error => {
                    observer.error(error);
                }
            );
        });
    }
    private static pollTransactionStatus(observable, statusUrl) {
        request.get({
            url: statusUrl,
            headers: { 'Content-Type': 'application/json' }
        },
            (error, response, body) => {
                if (error) return observable.error(error);
                try {
                    body = JSON.parse(body);
                    var status = new TransactionStatus(body);

                    if (status.isFinal) {
                        observable.next(status);
                        return observable.complete();
                    }
                    this.pollTransactionStatus(observable, statusUrl);
                } catch (e) {
                    return observable.error(e);
                }
            }
        );
    }
    static getTransactionStatus(statusUrl: string): Observable<TransactionStatus> {
        return Observable.create(observable => {
            this.pollTransactionStatus(observable, statusUrl);
        });
    }
}