import * as dateFormat from 'dateformat';
import { Address, InvoiceAddress } from './address';

export class GiftCardCheck {
    /**
     * The 19-digit card number of the gift card
     */
    cardNumber: string;
    /**
     *  The 6-digit PIN code belonging to the gift card
     */
    pincode: string;
}

export class ChargeGiftCard {
    /**
     * The 19-digit card number of the gift card
     */
    cardNumber: string;
    /**
     *  The 6-digit PIN code belonging to the gift card
     */
    pincode: string;
    /**
     * Your sales location starts with 'SL-' followed by 8 digits.
     */
    serviceId: string;
    /**
     *  The amount in cents to be removed from the gift card
     */
    amount: number;
    /**
     *  URL to which the visitor will be redirected when payment is complete
     */
    finishUrl: string;
    /**
     *  Description of the order (maximum 32 characters)
     */
    description: string;
    /**
     * Currency according to ISO 4217 (3-alpha code). If empty, EUR is used.
     */
    currency: string;
    /**
     *  The id of the promoter (webmaster)
     */
    promotorID: number;
    /**
     *  Variable 'info' that can be traced in the statistics
     */
    info: string;
    /**
     *  Variable 'tool' that can be traced in the statistics
     */
    tool: string;
    /**
     *  Free variable 'extra1' that can be traced in the statistics. (advice: ID of the order)
     */
    extra1: string;
    /**
     * Free variable 'extra2' that can be traced in the statistics. (advice: customer reference)
     */
    extra2: string;
    /**
     *  Free variable 'extra3' that can be traced in the statistics
     */
    extra3: string;
}

export class ActivateGiftCard {
    /**
     * The 19-digit card number of the gift card
     */
    cardNumber: string;
    /**
     * The amount to be put on the card
     */
    amount: number;
    /**
     * A unique reference to the point of sale where the card is activated
     */
    posId: string;
    /**
     * The 6-digit PIN code belonging to the gift card
     */
    pincode: string
}

export class GiftCardCheckClass extends GiftCardCheck {
    constructor(data: GiftCardCheck) {
        super();
        (<any>Object).assign(this, data);
    }

    getForApi () {
        var data = {};
        data['cardNumber'] = this.cardNumber;
        data['pincode'] = this.pincode;

        return data;
    }
}

export class ChargeGiftCardClass extends ChargeGiftCard {
    constructor(data: ChargeGiftCard) {
        super();
        (<any>Object).assign(this, data)
    }

    getForApi () {
        var data = {}
        data['cardNumber'] = this.cardNumber;
        data['pincode'] = this.pincode;
        data['serviceId'] = this.serviceId;
        data['amount'] = this.amount;
        data['finishUrl'] = this.finishUrl;
        data['description'] = this.description;
        data['currency'] = this.currency;

        data['statsData'] = {}
        if (this.promotorID) data['statsData']['promotorId'] = this.promotorID;
        if (this.info) data['statsData']['info'] = this.info;
        if (this.tool) data['statsData']['tool'] = this.tool;
        if (this.extra1) data['statsData']['extra1'] = this.extra1;
        if (this.extra2) data['statsData']['extra2'] = this.extra2;
        if (this.extra3) data['statsData']['extra3'] = this.extra3;

        if (Object.keys(data['statsData']).length == 0) {
            delete data['statsData'];
        }
        return data;
    }
}

export class ActivateGiftCardClass extends ActivateGiftCard{
    constructor(data: ActivateGiftCard) {
        super();
        (<any>Object).assign(this, data)
    }

    getForApi () {
        var data = {};
        data['cardNumber'] = this.cardNumber;
        data['amount'] = this.amount;
        data['posId'] = this.posId;
        data['pincode'] = this.pincode;

        return data;
    }
}