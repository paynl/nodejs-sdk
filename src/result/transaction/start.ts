export class StartResult {
    /**
     * The id of the transaction
     */
    transactionId: string;
    /**
     * The url to redirect the user to to complete the payment
     */
    paymentURL: string;

    popupAllowed: boolean;
    paymentReference: string;

    /**
     * Hash to fetch the status or receipt from the terminal
     */
    terminalHash?: string;
    terminalStatusUrl?: string;

    constructor(data) {
        this.transactionId = data.transaction.transactionId;
        this.paymentURL = data.transaction.paymentURL;
        this.popupAllowed = data.transaction.popupAllowed;
        this.paymentReference = data.transaction.paymentReference;

        if (data.terminal) {
            this.terminalHash = data.terminal.hash;
            this.terminalStatusUrl = data.terminal.statusUrl;
        }
    }
}