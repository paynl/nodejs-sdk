export class Mandate { 
    mandateId: string;
    bankaccountNumber: string;
    bankaccountOwner: string;
    bankaccountBic: string;
    amount: number;
    description: string;
    /**
     * 	The number of periods between transactions.
     * 
     *  intervalValue = 2 
     *  intervalPeriod = 1(week) 
     * 
     *  The transaction will be executed every 2 weeks
     */
    intervalValue: number;
    /**
     * The interval period. 
     * The options are:
     * 
     * - 1 Week
     * - 2 Month
     * - 3 Quarter
     * - 4 Half year
     * - 5 Year
     * - 6 Day
     * - 7 Manual
     */
    intervalPeriod: number;
    /**
     * The number of times this transaction will be executed in the furture
     */
    intervalQuantity: number;
    /** 
     *  Possible values are:
     * - first
     * - active
     * - last
     * - deleted
     * - single
     */
    state: string;
    ipAddress: string;
    email: string;
    promotorId?: string;
    tool?: string;
    info?: string;
    object?: string;
    extra1?: string;
    extra2?: string;
    extra3?: string;
    constructor(data: Mandate){
        data.amount = data.amount/100;

        (<any>Object).assign(this, data);
    }
}
export class DirectDebit {
    referenceId: string;
    bankaccountNumber: string;
    bankaccountOwner: string;
    bankaccountBic: string;
    amount: number;
    description: string;
    sendDate: string;
    receiveDate: string;
    /**
     * - 91: Added.
     * - 526: In batch
     * - 94: Processed.
     * - 97: Processed.
     * - 100: Cashed.
     * - 103: Deleted.
     * - 106: Reversal.
     * - 127: Refused by bank.
     * - 199: Relist 
     */
    statusCode: number;
    statusName: string;
    /**
     * - 109: Administrative reason.
     * - 112: Account canceled.
     * - 115: Account unknown.
     * - 118: No debit authorization provided.
     * - 121: Incasso disallowed.
     * - 124: Incasso executed twice.
     * - 271: Name/number do not match.
     * - 274: Account blocked.
     * - 277: Selective debit blockade.
     * - 280: Account WKA.
     * - 286: Reason not supplied.
     * - 331: Report wrongful debit 
     */
    declineCode: number;
    declineName: string;
    declineDate: string;
    constructor(data: DirectDebit){
        data.amount = data.amount/100;

        (<any>Object).assign(this, data);
    }
}

export class DirectDebitInfoResponse {
    /**
     * The mandate, this is the transaction data as stored in pay.
     * When you start the transaction, the data you supply is stored here.
     */
    mandate: Mandate;
    /**
     * The actual transaction.
     * This is only filled when the transaction has been sent to the bank.
     * When using a mandate or recurring transaction, this will contain an array with all previous transactions
     */
    directDebit?: DirectDebit[];
    constructor(data: DirectDebitInfoResponse) {
        
        if (data.directDebit){
            this.directDebit = [];
            data.directDebit.forEach(element => {
                this.directDebit.push(new DirectDebit(element));
            });
            
        }
        this.mandate = this.mandate = new Mandate(data.mandate);
    }
}