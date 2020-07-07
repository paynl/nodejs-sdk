import { Observable } from 'rxjs/Observable';
import { Api } from './api/api';
import { Paymentmethod } from './result/paymentmethod';


export class Paymentmethods {
    private static reorderGetServiceData(data) {
        var baseUrl = data.service.basePath;
        var paymentmethods = {};
        for (let countrycode in data['countryOptionList']) {
            let country = data['countryOptionList'][countrycode];
            for (let paymentmethodId in country['paymentOptionList']) {
                let paymentmethod = country['paymentOptionList'][paymentmethodId];
                if (paymentmethodId != '10') {
                    // we only want iDEAL banks, for myBank and Giropay the list is quite large
                    delete paymentmethod['paymentOptionSubList'];
                }
                if (paymentmethod['paymentOptionSubList']) {
                    for (let bankId in paymentmethod['paymentOptionSubList']) {
                        let bank = paymentmethod['paymentOptionSubList'][bankId];
                        paymentmethod['paymentOptionSubList'][bankId]['img'] = baseUrl + bank['path'] + bank['img'];
                    }
                }
                paymentmethod['countries'] = [];
                paymentmethod['countries'].push({
                    id: country['id'],
                    name: country['visibleName']
                })
                if (paymentmethods[paymentmethodId]) {
                    paymentmethods[paymentmethodId]['countries'].push({
                        id: country['id'],
                        name: country['visibleName']
                    })
                } else {
                    paymentmethods[paymentmethodId] = paymentmethod;
                }
            }
        }
        return paymentmethods;

    }
    static getList(): Observable<Paymentmethod> {
        return Observable.create(observer => {
            Api.post('Transaction', 'getService', 16).map(
                (result) => {
                    var paymentmethods = [];
                    var reordered = this.reorderGetServiceData(result);
                    for (let paymentmethodId in reordered) {
                        let paymentmethod = reordered[paymentmethodId];
                        paymentmethods.push(new Paymentmethod(paymentmethod));
                    }
                    return paymentmethods;
                }
            ).subscribe(
                paymentmethods => {
                    paymentmethods.forEach(paymentmethod => {
                        observer.next(paymentmethod);
                    });
                },
                error => observer.error(error),
                () => observer.complete()
                );
        });
    }
}