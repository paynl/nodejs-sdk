import { Observable } from 'rxjs/Observable'
import { Transaction } from '../index';
import { Refund } from '../datatypes/refund';
import { Address, InvoiceAddress } from '../datatypes/address';

export class TransactionResult {
    transactionId: string;
    connection: Connection;
    enduser: Enduser;
    saleData: SaleData;
    paymentDetails: PaymentDetails;
    statsDetails: StatsDetails;
    constructor(data) {
        this.transactionId = data['transactionId'];
        this.connection = new Connection(data['connection']);
        this.enduser = new Enduser(data['enduser']);
        this.saleData = new SaleData(data['saleData']);
        this.paymentDetails = new PaymentDetails(data['paymentDetails']);
        this.statsDetails = new StatsDetails(data['statsDetails']);
    }

    isPaid(){
        return this.paymentDetails.stateName == 'PAID';
    }

    isPending(){
        return this.paymentDetails.stateName == 'PENDING' || this.paymentDetails.stateName == 'VERIFY';
    }
    isCanceled(){
        return this.paymentDetails.state < 0;
    }
    isRefunded(alsoPartial: boolean){
        if(this.paymentDetails.stateName == 'REFUND') return true;
        if(alsoPartial && this.paymentDetails.stateName == 'PARTIAL_REFUND') return true;
        return false;
    }
    isPartiallyRefunded(){
        return this.paymentDetails.stateName == 'PARTIAL_REFUND';
    }
    isBeingVerified(){
        return this.paymentDetails.stateName == 'VERIFY';
    }
    isAuthorised(){
        return this.paymentDetails.state == 95;
    }
    approve():Observable<boolean> {
        return Transaction.approve(this.transactionId);
    }
    decline():Observable<boolean> {
        return Transaction.decline(this.transactionId);
    }
    refund(options: ResultRefund = null):Observable<string> {
        var refund = new Refund;
        (<any>Object).assign(refund, options);
        refund.transactionId = this.transactionId;
        return Transaction.refund(refund);
    }
}
export class ResultRefund {
    amount?: number;
    description?: string;
    processDate?: Date;
}
export class Connection {
    trust: number;
    country?: string;
    city?: string;
    locationLat?: string;
    locationLon?: string;
    browserData?: string;
    ipAddress?: string;
    blacklist?: number;
    host?: string;
    orderIpAddress?: string;
    orderReturnURL?: string;
    merchantCode?: string;
    merchantName?: string;

    constructor(data) {
        (<any>Object).assign(this, data);
    }
}

export class Enduser {
    accessCode?: string;
    language?: string;
    initials?: string;
    lastName?: string;
    gender?: string;
    dob?: string;
    phoneNumber?: string;
    emailAddress?: string;
    bankaccount?: string;
    iban?: string;
    bic?: string;
    sendConfirmMail?: string;
    confirmMailTemplate?: string;

    address?: Address;
    invoiceAddress?: InvoiceAddress;

    constructor(data) {
        (<any>Object).assign(this, data);
    }
}
function parseDate(date: string){
    var arrDate = date.split('-');
    return new Date(parseInt(arrDate[2]), parseInt(arrDate[1])-1, parseInt(arrDate[0]));    
}
export class SaleData {
    invoiceDate?: Date;
    deliveryDate?: Date;
    orderData?: OrderDataRow[];
    constructor(data) {       
        if(data['invoiceDate']) this.invoiceDate = parseDate(data['invoiceDate']);
        if(data['deliveryDate']) this.deliveryDate = parseDate(data['deliveryDate']);

        if (data['orderData']) {
            this.orderData = [];
            Object.keys(data['orderData']).forEach(key => {
                this.orderData.push(new OrderDataRow(data['orderData'][key]));
            });
        }
    }
}

export class OrderDataRow {
    productId: number;
    description: string;
    price: number;
    quantity: number;
    vatCode: string;
    constructor(data) {
        data.price = data.price / 100;
        (<any>Object).assign(this, data);
    }
}
export class PaymentDetails {
    amount: number;
    currencyAmount: number;
    paidAmount: number;
    paidCurrenyAmount: number;
    paidBase: number;
    paidCosts?: number;
    paidCostsVat?: number;
    paidCurreny: string;
    paidAttemps: number;
    paidDuration?: any;
    description: any;
    processTime: any;
    state: number;
    stateName: string;
    exchange: number;
    storno?: number;
    paymentOptionId: number;
    paymentOptionSubId: number;
    secure?: number;
    secureStatus?: string;
    identifierName: string;
    identifierPublic: string;
    identifierHash: string;
    serviceId: string;
    serviceName: string;
    serviceDescription: string;
    created: string;
    modified: string;
    paymentMethodId: number;
    paymentMethodName: string;
    paymentMethodDescription: string;
    paymentProfileName: string;
    constructor(data) {
        data['amount'] = data['amount'] / 100;
        data['currencyAmount'] = data['currenyAmount'] / 100;
        delete data['currenyAmount'];
        data['paidAmount'] = data['paidAmount'] / 100;
        data['paidCurrencyAmount'] = data['paidCurrenyAmount'] / 100;
        delete data['paidCurrenyAmount'];
        data['paidBase'] = data['paidBase'] / 100;
        data['paidCosts'] = data['paidCosts'] / 100;
        data['paidCostsVat'] = data['paidCostsVat'] / 100;

        (<any>Object).assign(this, data);
    }
}

export class StatsDetails {
    paymentSessionId?: number;
    tool?: string;
    info?: string;
    promotorId?: number;
    extra1?: string;
    extra2?: string;
    extra3?: string;
    transferData?: string;
    object?: string;
    constructor(data) {
        (<any>Object).assign(this, data);
    }
}