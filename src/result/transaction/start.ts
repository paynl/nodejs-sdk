export class StartResult{
    transactionId: string;
    paymentURL: string;
    popupAllowed: boolean;
    paymentReference: string;

    constructor(data){
        this.transactionId = data.transactionId;
        this.paymentURL = data.paymentURL;
        this.popupAllowed = data.popupAllowed;
        this.paymentReference = data.paymentReference;
    }
}