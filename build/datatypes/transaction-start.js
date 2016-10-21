"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dateFormat = require('dateformat');
var Product = (function () {
    function Product() {
    }
    return Product;
}());
exports.Product = Product;
var Enduser = (function () {
    function Enduser() {
    }
    return Enduser;
}());
exports.Enduser = Enduser;
var TransactionStart = (function () {
    function TransactionStart() {
    }
    return TransactionStart;
}());
exports.TransactionStart = TransactionStart;
var TransactionStartClass = (function (_super) {
    __extends(TransactionStartClass, _super);
    function TransactionStartClass(data) {
        _super.call(this);
        Object.assign(this, data);
    }
    TransactionStartClass.prototype.formatDate = function (date) {
        return dateFormat(date, 'dd-mm-yyyy');
    };
    TransactionStartClass.prototype.formatDateTime = function (date) {
        return dateFormat(date, 'dd-mm-yyyy hh:MM:ss');
    };
    TransactionStartClass.prototype.calculateVatCode = function (priceIncl, vatAmount) {
        var vatCodes = { 0: 'N', 6: 'L', 21: 'H' };
        var priceExcl = priceIncl - vatAmount;
        if (!vatAmount || vatAmount == 0 || !priceIncl || priceIncl == 0) {
            return vatCodes[0];
        }
        var vatRate = (vatAmount / priceExcl) * 100;
        var closest = Object.keys(vatCodes).reduce(function (prev, curr) {
            var prevFloat = parseFloat(prev);
            var currFloat = parseFloat(curr);
            return (Math.abs(currFloat - vatRate) < Math.abs(prevFloat - vatRate) ? curr : prev);
        });
        return vatCodes[closest];
    };
    TransactionStartClass.prototype.getForApi = function () {
        var _this = this;
        var data = {};
        data['amount'] = Math.round(this.amount * 100);
        data['finishUrl'] = this.returnUrl;
        data['ipAddress'] = this.ipAddress;
        if (this.paymentMethodId)
            data['paymentOptionId'] = this.paymentMethodId;
        if (this.bankId)
            data['paymentOptionSubId'] = this.bankId;
        if (this.testMode)
            data['testMode'] = 1;
        data['transaction'] = {};
        if (this.currency)
            data['transaction']['currency'] = this.currency;
        if (this.expireDate)
            data['transaction']['expireDate'] = this.formatDateTime(this.expireDate);
        if (this.exchangeUrl)
            data['transaction']['orderExchangeUrl'] = this.exchangeUrl;
        if (this.description)
            data['transaction']['description'] = this.description;
        data['statsData'] = {};
        if (this.extra1)
            data['statsData']['extra1'] = this.extra1;
        if (this.extra2)
            data['statsData']['extra2'] = this.extra2;
        if (this.extra3)
            data['statsData']['extra3'] = this.extra3;
        if (Object.keys(data['statsData']).length == 0) {
            delete data['statsData'];
        }
        data['enduser'] = {};
        if (this.language)
            data['enduser']['language'] = this.language;
        if (this.enduser) {
            if (this.enduser.initials)
                data['enduser']['initials'] = this.enduser.initials;
            if (this.enduser.lastName)
                data['enduser']['lastName'] = this.enduser.lastName;
            if (this.enduser.gender)
                data['enduser']['gender'] = this.enduser.gender;
            if (this.enduser.dob)
                data['enduser']['dob'] = this.formatDate(this.enduser.dob);
            if (this.enduser.phoneNumber)
                data['enduser']['phoneNumber'] = this.enduser.phoneNumber;
            if (this.enduser.emailAddress)
                data['enduser']['emailAddress'] = this.enduser.emailAddress;
        }
        if (this.address) {
            data['enduser']['address'] = this.address;
            data['enduser']['address']['streetNumber'] = data['enduser']['address']['houseNumber'];
            ;
            delete data['enduser']['address']['houseNumber'];
        }
        if (this.invoiceAddress) {
            data['enduser']['invoiceAddress'] = this.invoiceAddress;
            data['enduser']['invoiceAddress']['streetNumber'] = data['enduser']['invoiceAddress']['houseNumber'];
            ;
            delete data['enduser']['invoiceAddress']['houseNumber'];
        }
        data['saleData'] = {};
        if (this.invoiceDate)
            data['saleData']['invoiceDate'] = this.formatDate(this.invoiceDate);
        if (this.deliveryDate)
            data['saleData']['deliveryDate'] = this.formatDate(this.deliveryDate);
        if (this.products) {
            data['saleData']['orderData'] = [];
            this.products.forEach(function (product) {
                data['saleData']['orderData'].push({
                    productId: product.id,
                    description: product.name,
                    price: Math.round(product.price * 100),
                    quantity: product.qty,
                    vatCode: _this.calculateVatCode(product.price, product.tax)
                });
            });
        }
        return data;
    };
    return TransactionStartClass;
}(TransactionStart));
exports.TransactionStartClass = TransactionStartClass;
//# sourceMappingURL=transaction-start.js.map