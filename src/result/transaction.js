"use strict";
var TransactionResult = (function () {
    function TransactionResult(data) {
        this.connection = new Connection(data['connection']);
        this.enduser = new Enduser(data['enduser']);
        this.saleData = new SaleData(data['saleData']);
        this.paymentDetails = new PaymentDetails(data['paymentDetails']);
        this.stornoDetails = new StornoDetails(data['stornoDetails']);
        this.statsDetails = new StatsDetails(data['statsDetails']);
    }
    return TransactionResult;
}());
exports.TransactionResult = TransactionResult;
var Connection = (function () {
    function Connection(data) {
        Object.assign(this, data);
    }
    return Connection;
}());
exports.Connection = Connection;
var Enduser = (function () {
    function Enduser(data) {
        Object.assign(this, data);
    }
    return Enduser;
}());
exports.Enduser = Enduser;
var SaleData = (function () {
    function SaleData(data) {
        var _this = this;
        this.invoiceDate = data['invoiceDate'];
        this.deliveryDate = data['deliveryDate'];
        if (data['orderData']) {
            this.orderData = [];
            Object.keys(data['orderData']).forEach(function (key) {
                _this.orderData.push(new OrderDataRow(data['orderData'][key]));
            });
        }
    }
    return SaleData;
}());
exports.SaleData = SaleData;
var OrderDataRow = (function () {
    function OrderDataRow(data) {
        data.price = data.price / 100;
        Object.assign(this, data);
    }
    return OrderDataRow;
}());
exports.OrderDataRow = OrderDataRow;
var PaymentDetails = (function () {
    function PaymentDetails(data) {
        data['amount'] = data['amount'] / 100;
        data['currencyAmount'] = data['currencyAmount'] / 100;
        data['paidAmount'] = data['paidAmount'] / 100;
        data['paidCurrenyAmount'] = data['paidCurrenyAmount'] / 100;
        data['paidBase'] = data['paidBase'] / 100;
        data['paidCosts'] = data['paidCosts'] / 100;
        data['paidCostsVat'] = data['paidCostsVat'] / 100;
        Object.assign(this, data);
    }
    return PaymentDetails;
}());
exports.PaymentDetails = PaymentDetails;
var StornoDetails = (function () {
    function StornoDetails(data) {
        data['stornoAmount'] = data['stornoAmount'] / 100;
        Object.assign(this, data);
    }
    return StornoDetails;
}());
exports.StornoDetails = StornoDetails;
var StatsDetails = (function () {
    function StatsDetails(data) {
        Object.assign(this, data);
    }
    return StatsDetails;
}());
exports.StatsDetails = StatsDetails;
//# sourceMappingURL=transaction.js.map