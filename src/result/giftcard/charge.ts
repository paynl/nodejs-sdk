export class ChargeResult {
    /**
     *  The unique ID of the transaction starting with EX-
     */
    transactionId: string;
    /**
     *  Unique ID of the order
     */
    orderId: string;
    /**
     *  Unique code related to the order
     */
    entranceCode: string;
    /**
     *  Gift card used in the transaction
     */
    cardName: string;

    constructor(data) {
        this.transactionId = data.transaction.transactionId;
        this.orderId = data.transaction.orderId;
        this.entranceCode = data.transaction.entranceCode;
        this.cardName = data.transaction.cardName;
    }
}