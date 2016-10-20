import { Address, InvoiceAddress } from '../datatypes/address';

export class TransactionResult {
    connection: Connection;
    enduser: Enduser;
    saleData: SaleData;
    paymentDetails: PaymentDetails;
    stornoDetails: StornoDetails;
    statsDetails: StatsDetails;
    constructor(data) {
        this.connection = new Connection(data['connection']);
        this.enduser = new Enduser(data['enduser']);
        this.saleData = new SaleData(data['saleData']);
        this.paymentDetails = new PaymentDetails(data['paymentDetails']);
        this.stornoDetails = new StornoDetails(data['stornoDetails']);
        this.statsDetails = new StatsDetails(data['statsDetails']);
    }
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
        Object.assign(this, data);
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
        Object.assign(this, data);
    }
}

export class SaleData {
    invoiceDate?: string;
    deliveryDate?: string;
    orderData?: OrderDataRow[];
    constructor(data) {
        this.invoiceDate = data['invoiceDate'];
        this.deliveryDate = data['deliveryDate'];

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
        Object.assign(this, data);
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
        data['amount']=data['amount']/100;
        data['currencyAmount']=data['currencyAmount']/100;
        data['paidAmount']=data['paidAmount']/100;
        data['paidCurrenyAmount']=data['paidCurrenyAmount']/100;
        data['paidBase']=data['paidBase']/100;
        data['paidCosts']=data['paidCosts']/100;
        data['paidCostsVat']=data['paidCostsVat']/100;

        Object.assign(this, data);
    }
}
export class StornoDetails {
    stornoId?: number;
    stornoAmount?: number;
    bankAccount?: string;
    iban?: string;
    bic?: string;
    city?: string;
    datetime?: string;
    reason?: string;
    emailAddress?: string;
    constructor(data) {
        data['stornoAmount'] = data['stornoAmount']/100;
        Object.assign(this, data);
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
        Object.assign(this, data);
    }
}