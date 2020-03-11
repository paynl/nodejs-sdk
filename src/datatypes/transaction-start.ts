import * as dateFormat from 'dateformat';
import { Address, InvoiceAddress } from './address';

export enum ProductType {
    ARTICLE='ARTICLE',SHIPPING='SHIPPING',HANDLING='HANDLING',DISCOUNT='DISCOUNT'
}
export class Product {
    /**
     * Your id of the product
     */
    id: string;
    /**
     * The name of the product
     */
    name: string;
    /**
     * The price of the product
     */
    price: number;
    /**
     * the amount of vat for this product
     */
    tax: number;
    /**
     * The quantity of this product in the order
     */
    qty: number;
    /**
     * The type of this product in the order
     */
    type: ProductType;
}
export class Enduser {
    initials?: string;
    lastName?: string;
    gender?: string;
    dob?: Date;
    phoneNumber?: string;
    emailAddress?: string;
}

export class TransactionStart {
    /**
     * The total amount for this order
     */
    amount: number;
    /**
     * The return url, we will redirect the user to this url after payment and cancellation
     */
    returnUrl: string;
    /**
     * The ipaddress of the user, we use this for fraud checks.
     * If you dont have an ip, like when you are generating payment links, use 10.20.30.40
     */
    ipAddress: string;
    /**
     * 3-letter ISO-4217 Code for the currency
     */
    currency?: string;
    /**
     * The time until when the payment link is valid
     */
    expireDate?: Date;
    /**
     * Also known as IPN or webHook
     * We call this url when the status of the transaction changes
     */
    exchangeUrl?: string;
    /**
     * The id of the paymentmethod.
     * Use PaymentMethods.getList() to retrieve the available paymentmethods 
     */
    paymentMethodId?: number;
    /**
     * The id of the bank, only for iDEAL
     */
    bankId?: number;
    /**
     * The TH-code of the terminal
     */
    terminalId?: string;
    /**
     * The description of the transaction.
     */
    description?: string;
    /**
     * The number belonging to the order.
     */
    orderNumber?: string;
    /**
     * Set to true if you want to do a sandbox transaction
     */
    testMode?: boolean;
    /**
     * 2-Letter language code
     */
    language?: string;
    /**
     * Free value
     */
    extra1?: string;
    /**
     * Free value
     */
    extra2?: string;
    /**
     * Free value
     */
    extra3?: string;

    /**
     * The invoiceDate
     */
    invoiceDate?: Date;
    /**
     * The delivery date
     */
    deliveryDate?: Date;

    /**
     * If the transaction is an order, supply the products here
     */
    products?: Product[];
    /**
     * The customer
     */
    enduser?: Enduser;
    /**
     * The shipping address
     */
    address?: Address;
    /**
     * The invoice address
     */
    invoiceAddress?: InvoiceAddress;
}

export class TransactionStartClass extends TransactionStart {
    constructor(data: TransactionStart) {
        super();
        (<any>Object).assign(this, data);
    }
    private formatDate(date: Date) {
        return dateFormat(date, 'dd-mm-yyyy');
    }
    private formatDateTime(date: Date) {
        return dateFormat(date, 'dd-mm-yyyy hh:MM:ss');
    }
    private calculateVatCode(priceIncl, vatAmount) {
        var vatCodes = { 0: 'N', 6: 'L', 21: 'H' };
        var priceExcl = priceIncl - vatAmount;
        if (!vatAmount || vatAmount == 0 || !priceIncl || priceIncl == 0) {
            return vatCodes[0];
        }

        var vatRate = (vatAmount / priceExcl) * 100;

        var closest = Object.keys(vatCodes).reduce(
            (prev, curr) => {
                var prevFloat = parseFloat(prev);
                var currFloat = parseFloat(curr);
                return (Math.abs(currFloat - vatRate) < Math.abs(prevFloat - vatRate) ? curr : prev);
            });

        return vatCodes[closest];
    }

    getForApi() {
        var data = {};
        data['amount'] = Math.round(this.amount * 100);
        data['finishUrl'] = this.returnUrl;
        data['ipAddress'] = this.ipAddress;

        if (this.paymentMethodId) data['paymentOptionId'] = this.paymentMethodId;
        if (this.bankId) data['paymentOptionSubId'] = this.bankId;
        if (this.terminalId) data['paymentOptionSubId'] = this.terminalId;
        if (this.testMode) data['testMode'] = 1;

        data['transaction'] = {};
        if (this.currency) data['transaction']['currency'] = this.currency;
        if (this.expireDate) data['transaction']['expireDate'] = this.formatDateTime(this.expireDate);
        if (this.exchangeUrl) data['transaction']['orderExchangeUrl'] = this.exchangeUrl;
        if (this.description) data['transaction']['description'] = this.description;
        if (this.orderNumber) data['transation']['orderNumber'] = this.orderNumber;

        data['statsData'] = {};
        if (this.extra1) data['statsData']['extra1'] = this.extra1;
        if (this.extra2) data['statsData']['extra2'] = this.extra2;
        if (this.extra3) data['statsData']['extra3'] = this.extra3;

        if (Object.keys(data['statsData']).length == 0) {
            delete data['statsData'];
        }

        data['enduser'] = {};
        if (this.language) data['enduser']['language'] = this.language;
        if (this.enduser) {
            if (this.enduser.initials) data['enduser']['initials'] = this.enduser.initials;
            if (this.enduser.lastName) data['enduser']['lastName'] = this.enduser.lastName;
            if (this.enduser.gender) data['enduser']['gender'] = this.enduser.gender;
            if (this.enduser.dob) data['enduser']['dob'] = this.formatDate(this.enduser.dob);
            if (this.enduser.phoneNumber) data['enduser']['phoneNumber'] = this.enduser.phoneNumber;
            if (this.enduser.emailAddress) data['enduser']['emailAddress'] = this.enduser.emailAddress;
        }
        if (this.address) {
            data['enduser']['address'] = this.address;
            data['enduser']['address']['streetNumber'] = data['enduser']['address']['houseNumber'];
            delete data['enduser']['address']['houseNumber'];
            data['enduser']['address']['streetNumberExtension'] = data['enduser']['address']['houseNumberExtension'];
            delete data['enduser']['address']['houseNumberExtension'];
        }
        if (this.invoiceAddress) {
            data['enduser']['invoiceAddress'] = this.invoiceAddress;

            data['enduser']['invoiceAddress']['streetNumber'] = data['enduser']['invoiceAddress']['houseNumber'];;
            delete data['enduser']['invoiceAddress']['houseNumber'];

            data['enduser']['invoiceAddress']['streetNumberExtension'] = data['enduser']['invoiceAddress']['houseNumberExtension'];
            delete data['enduser']['address']['houseNumberExtension'];
        }

        data['saleData'] = {};
        if (this.invoiceDate) data['saleData']['invoiceDate'] = this.formatDate(this.invoiceDate);
        if (this.deliveryDate) data['saleData']['deliveryDate'] = this.formatDate(this.deliveryDate);
        if (this.products) {
            data['saleData']['orderData'] = [];
            this.products.forEach((product) => {
                data['saleData']['orderData'].push({
                    productId: product.id,
                    description: product.name,
                    price: Math.round(product.price * 100),
                    quantity: product.qty,
                    vatCode: this.calculateVatCode(product.price, product.tax),
                    productType: product.type 
                });
            });
        }

        return data;
    }
}