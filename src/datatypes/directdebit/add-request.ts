import * as dateFormat from 'dateformat';

export class DirectDebitAddRequest{
    amount: number;
    bankaccountHolder: string;
    bankaccountNumber: string;
    bankaccountBic?: string;
    processDate?: Date;
    description?: string;
    ipAddress?: string;
    email?: string;
    promotorId?: number;
    tool?: string;
    info?: string;
    object?: string;
    extra1?: string;
    extra2?: string;
    extra3?: string;
    currency?: string;
    exchangeUrl?: string;
}
export class DirectDebitAddRequestClass extends DirectDebitAddRequest {
    constructor(data: DirectDebitAddRequest) {
        super();
        (<any>Object).assign(this, data);
    }
    private formatDate(date: Date) {
        return dateFormat(date, 'dd-mm-yyyy');
    }
    private formatDateTime(date: Date) {
        return dateFormat(date, 'dd-mm-yyyy hh:MM:ss');       
    }

    getForApi() {
        var data = {};

        data['amount'] = Math.round(this.amount * 100);
        data['bankaccountHolder'] = this.bankaccountHolder;
        data['bankaccountNumber'] = this.bankaccountNumber;

        if(this.bankaccountBic) data['bankaccountBic'] = this.bankaccountBic;
        if(this.processDate) data['processDate'] = this.formatDate(this.processDate);
        if(this.description) data['description'] = this.description;
        if(this.ipAddress) data['ipAddress'] = this.ipAddress;
        if(this.email) data['email'] = this.email;
        if(this.promotorId) data['promotorId'] = this.promotorId;
        if(this.tool) data['tool'] = this.tool;
        if(this.info) data['info'] = this.info;
        if(this.object) data['object'] = this.object;
        if(this.extra1) data['extra1'] = this.extra1;
        if(this.extra2) data['extra2'] = this.extra2;
        if(this.extra3) data['extra3'] = this.extra3;
        if(this.currency) data['currency'] = this.currency;
        if(this.exchangeUrl) data['exchangeUrl'] = this.exchangeUrl;
        return data;
    }
}