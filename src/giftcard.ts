import { CheckResult} from "./result/giftcard/check";
import { ChargeResult} from "./result/giftcard/charge";
import { ActivateResult} from "./result/giftcard/activate";
import { GiftCardCheck, GiftCardCheckClass, ChargeGiftCard, ChargeGiftCardClass, ActivateGiftCard, ActivateGiftCardClass} from "./datatypes/giftcard";
import { Api } from './api/api';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

export class GiftCard {
    static version = 1;

    static check(options: GiftCardCheck) : Observable<CheckResult> {
        return Observable.create(observable => {
            // Prepare the data
            var startData = new GiftCardCheckClass(options);

            if (!startData.cardNumber) {
                observable.error('Giftcardnumber is not set');
                observable.complete();
                return
            }

            Api.post('Voucher', 'info', this.version, startData.getForApi()).map(
                (result) => new CheckResult(result)

            ).subscribe(
                (result) => observable.next(result),
                (error) => observable.error(error),
                () => observable.complete()
            );
        });
    }


    static charge(options: ChargeGiftCard): Observable<ChargeResult> {
        return Observable.create(observable => {
            // Prepare the data
            var startData = new ChargeGiftCardClass(options);

            if (!startData.cardNumber) {
                observable.error('Giftcardnumber is not set');
                observable.complete();
                return;
            }
            if (!startData.pin) {
                observable.error('Pin is not set');
                observable.complete();
                return;
            }
            if (!startData.serviceId) {
                observable.error('ServiceId is not set');
                observable.complete();
                return;
            }
            if (!startData.amount) {
                observable.error('amount is not set');
                observable.complete()
                return;
            }
            if (!startData.finishUrl) {
                observable.error('finishUrl is not set')
                observable.complete();
                return;
            }
            
            Api.post('Voucher', 'transaction', this.version, startData.getForApi()).map(
                (result) => new ChargeResult(result)
            ).subscribe(
                (result) => observable.next(result),
                (error) => observable.error(error),
                () => observable.complete()
            );
        });
    }

    static activate(options: ActivateGiftCard):Observable<ActivateResult> {
        return Observable.create(observable => {
            // Prepare the data
            var startData = new ActivateGiftCardClass(options);

            if (!startData.cardNumber) {
                observable.error('cardNumber is not set');
                observable.complete();
                return;
            }
            if (!startData.amount) {
                observable.error('amount is not set');
                observable.complete();
                return;
            }

            if (!startData.posId) {
                observable.error('posId is not set');
                observable.complete();
                return;
            }

            return Api.post('Voucher', 'activate', this.version, startData.getForApi()).map(
                (result) => new ActivateResult(result)
            ).subscribe(
                (result) => observable.next(result),
                (error) => observable.error(error),
                () => observable.complete()
            );
        });
    }
}
