import { StartResult } from './result/transaction/start';
import { TransactionStart, TransactionStartClass } from './datatypes/transaction-start';
import { Api } from './api/api';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
export class Transaction {
    static version = 5;

    static start(options: TransactionStart): Observable<StartResult> {
        return Observable.create((observable) => {
            // Prepare the data
            var startData = new TransactionStartClass(options);        

            if(!startData.amount){
                observable.error('Amount is not set');
                observable.complete();
                return;
            }            

            if(!startData.returnUrl){
                observable.error('returnUrl is not set');
                observable.complete();
                return;               
            }           

            if(!startData.ipAddress){
                observable.error('ipAddress is not set');
                observable.complete();
                return;               
            }
            
            Api.post('transaction', 'start', this.version, startData.getForApi()).map(
                (result) => new StartResult(result.transaction)               
            ).subscribe(
                (result) => observable.next(result),
                (error) => observable.error(error),
                () => observable.complete()
            );
        });

    }
}
