import {Observable} from 'rxjs/Observable';

const REFERENCE_TYPE_STRING = 1;
const REFERENCE_TYPE_HEX = 0;
const HASH_METHOD = 'sha256';

export class DynamicUUID {
    /**
     * Generate a UUID
     *
     * @param serviceId The PAY. service-id from one of your sales locations
     * @param secret Your custom secret
     * @param reference Your reference to the transaction
     * @param padChar The reference will be padded with this character, default pad '0'
     * @param referenceType Define if you are using a string (8 chars) of hex (16 chars)
     */
    static encode(serviceId: string, secret: string, reference: string, padChar = '0', referenceType = REFERENCE_TYPE_STRING): Observable<string> {
        return Observable.create(observable => {
            if (referenceType == REFERENCE_TYPE_STRING) {
                if (!this.validateReferenceString(reference)) {
                    observable.error('Secret invalid: ' + secret);
                    observable.complete();
                    return;
                }
                reference = this.asciiToHex(reference);
            } else {
                if (!this.validateHexString(reference)) {
                    observable.error('Reference is not a valid hex: ' + reference);
                    observable.complete();
                    return;
                }
            }
            reference = reference.toLowerCase();

            if (!this.isValidSecret(secret)) {
                observable.error('Secret invalid: ' + secret);
                observable.complete();
                return;
            }
            if (!this.isValidServiceId(serviceId)) {
                observable.error('serviceId invalid: ' + serviceId);
                observable.complete();
                return;
            }
            if (!this.isValidPadChar(padChar)) {
                observable.error('padChar invalid: ' + padChar);
                observable.complete();
                return;
            }

            var uuid = serviceId.replace(/[^0-9]/g, '') + reference.padStart(16, padChar);
            var crypto = require('crypto');
            var hash = crypto.createHmac(HASH_METHOD, secret).update(uuid).digest('hex');

            uuid = 'b' + hash.substring(0, 7) + uuid;

            uuid =
                uuid.substring(0, 8) + '-' +
                uuid.substring(8, 12) + '-' +
                uuid.substring(12, 16) + '-' +
                uuid.substring(16, 20) + '-' +
                uuid.substring(20, 32);

            observable.next(uuid);
            observable.complete();
        });
    }

    /**
     * Decode a UUID
     *
     * @param uuid The UUID to decode
     * @param secret If supplied the uuid will be validated before decoding.
     * @param padChar The reference will be padded with this character, default '0'
     * @param referenceType
     */
    static decode(uuid: string, secret = '', padChar = '0', referenceType = REFERENCE_TYPE_STRING): Observable<any> {

        return Observable.create(observable => {

            if (secret != '') {
                if (!this.isValidSecret(secret)) {
                    observable.error('Secret is invalid: ' + secret);
                    observable.complete();
                    return
                }
            }

            uuid = uuid.replace(/[^0-9a-z]/ig, '');
            uuid = uuid.substr(8, uuid.length);

            var serviceid = 'SL-' + uuid.substring(0, 4) + '-' + uuid.substring(4, 8);
            var referenceCode = uuid.substring(8, uuid.length);

            referenceCode = this.ltrim(referenceCode, padChar);

            var referenc_hex = referenceCode;
            var reference_string = Buffer.from(referenceCode, "hex");

            var obj = {
                'serviceId': serviceid,
                'reference': referenceType == REFERENCE_TYPE_HEX ? referenc_hex : reference_string
            };

            observable.next(obj);
            observable.complete();
        });
    }

    /**
     * Validate UUID
     *
     * @param uuid Your UUID code
     * @param secret Your secret
     */
    static validate(uuid: string, secret = ''): Observable<string> {
        return Observable.create(observable => {

            if (secret != '') {
                if (!this.isValidSecret(secret)) {
                    observable.error('Secret is invalid: ' + secret);
                    observable.complete();
                    return
                }
            }

            var uuidData = uuid.replace(/[^0-9a-z]/ig, '');
            uuidData = uuidData.substring(8, uuidData.length);

            var crypto = require('crypto');
            var hash = crypto.createHmac(HASH_METHOD, secret).update(uuidData).digest('hex');

            var checksum = 'b' + hash.substring(0, 7);

            observable.next(checksum == uuid.substring(0, 8));
            observable.complete();
        });
    }

    private static ltrim(str, charlist) {
        charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
            .replace(/([[\]().?/*{}+$^:])/g, '$1')
        var re = new RegExp('^[' + charlist + ']+', 'g')
        return (str + '')
            .replace(re, '')
    }

    private static asciiToHex(str) {
        var arr1 = [];
        for (var n = 0, l = str.length; n < l; n++) {
            var hex = Number(str.charCodeAt(n)).toString(16).toUpperCase();
            arr1.push(hex);
        }
        return arr1.join('');
    }

    private static validateReferenceString(reference) {
        return /^[0-9a-zA-Z]{0,8}$/i.test(reference)
    }

    private static validateHexString(hexString) {
        return /^[0-9a-f]{0,16}$/i.test(hexString)
    }

    private static isValidSecret(secret) {
        return /^[0-9a-f]{40}$/i.test(secret);
    }

    private static isValidServiceId(serviceId) {
        return /^SL-[0-9]{4}-[0-9]{4}$/.test(serviceId);
    }

    private static isValidPadChar(padChar) {
        return /^[a-z0-9]{1}$/i.test(padChar);
    }

}