/* eslint-disable */
// @ts-nocheck

import * as dateFormat from 'dateformat';

export class Refund {
    transactionId: string;
    /**
     * The amount to refund
     */
    amount?: number;
    /**
     * The description to include with the payment
     */
    description?: string;
    /**
     * 	The date on which the refund needs to be processed
     */
    processDate?: Date;
}
export class RefundClass extends Refund {
    constructor(data: Refund) {
        super();
        (<any>Object).assign(this, data);
    }
    getForApi() {
        const result = {
            transactionId: this.transactionId,
        };
        if (this.amount) result['amount'] = Math.round(this.amount * 100);
        if (this.description) result['description'] = this.description;
        if (this.processDate) result['processDate'] = dateFormat(this.processDate, 'dd-mm-yyyy');

        return result;
    }
}
