export interface TransactionStatusInterface {
    status: string;
    txid: string;
    terminal: string;
    ssai: string;
    cardbrandlabelname?: string;
    cardbrandidentifier?: string;
    approvalID?: string;
    ticket?: string;
    error?: string;
    cancelled?: string;
    approved?: string;
    signature?: string;
    amount?: number;
    incidentcode?: string;
    incidentcodetext?: string;
}
export class TransactionStatus {
    constructor(private data: TransactionStatusInterface) { }
    get isFinal(): boolean {
        return this.data.status != 'start';
    }
    get isError(): boolean {
        return this.data.error == "1";
    }
    get isCanceled(): boolean {
        return this.data.cancelled == "1";
    }
    get isApproved(): boolean {
        return this.data.approved == "1";
    }
    get needsSignature(): boolean {
        return this.data.signature == "1";
    }
    get status(): string {
        return this.data.status;
    }
    get txId(): string {
        return this.data.txid;
    }
    get terminal(): string {
        return this.data.terminal;
    }
    get ssai(): string {
        return this.data.ssai;
    }
    get cardBrandLabelName(): string {
        return this.data.cardbrandlabelname;
    }
    get cardBrandIdentifier(): string {
        return this.data.cardbrandidentifier;
    }
    get approvalId(): string {
        return this.data.approvalID;
    }
    get receipt(): string {
        return this.data.ticket ? Buffer.from(this.data.ticket, 'base64').toString() : null;
    }
    get amount(): number {
        return this.data.amount ? this.data.amount / 100 : null;
    }
    get incidentCode(): string {
        return this.data.incidentcode;
    }
    get incidentCodeText(): string {
        return this.data.incidentcodetext;
    }
}