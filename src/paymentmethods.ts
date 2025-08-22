/* eslint-disable */
// @ts-nocheck
import { Observable } from 'rxjs/Observable';
import { Api } from './api/api';
import { Paymentmethod } from './result/paymentmethod';

export class Paymentmethods {
    private static reorderGetServiceData(data) {
        const baseUrl = data.service.basePath;
        const paymentmethods = {};
        for (const countrycode in data['countryOptionList']) {
            const country = data['countryOptionList'][countrycode];
            for (const paymentmethodId in country['paymentOptionList']) {
                const paymentmethod = country['paymentOptionList'][paymentmethodId];
                if (paymentmethodId != '10') {
                    // we only want iDEAL banks, for myBank and Giropay the list is quite large
                    delete paymentmethod['paymentOptionSubList'];
                }
                if (paymentmethod['paymentOptionSubList']) {
                    for (const bankId in paymentmethod['paymentOptionSubList']) {
                        const bank = paymentmethod['paymentOptionSubList'][bankId];
                        paymentmethod['paymentOptionSubList'][bankId]['img'] =
                            baseUrl + bank['path'] + bank['img'];
                    }
                }
                paymentmethod['countries'] = [];
                paymentmethod['countries'].push({
                    id: country['id'],
                    name: country['visibleName'],
                });
                if (paymentmethods[paymentmethodId]) {
                    paymentmethods[paymentmethodId]['countries'].push({
                        id: country['id'],
                        name: country['visibleName'],
                    });
                } else {
                    paymentmethods[paymentmethodId] = paymentmethod;
                }
            }
        }
        return paymentmethods;
    }
    static getList(): Observable<Paymentmethod> {
        return Observable.create(observer => {
            Api.post('Transaction', 'getService', 16)
                .map(result => {
                    const paymentmethods = [];
                    const reordered = this.reorderGetServiceData(result);
                    for (const paymentmethodId in reordered) {
                        const paymentmethod = reordered[paymentmethodId];
                        paymentmethods.push(new Paymentmethod(paymentmethod));
                    }
                    return paymentmethods;
                })
                .subscribe(
                    paymentmethods => {
                        paymentmethods.forEach(paymentmethod => {
                            observer.next(paymentmethod);
                        });
                    },
                    error => observer.error(error),
                    () => observer.complete(),
                );
        });
    }
}
