"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dateFormat = require('dateformat');
var Refund = (function () {
    function Refund() {
    }
    return Refund;
}());
exports.Refund = Refund;
var RefundClass = (function (_super) {
    __extends(RefundClass, _super);
    function RefundClass(data) {
        _super.call(this);
        Object.assign(this, data);
    }
    RefundClass.prototype.getForApi = function () {
        var result = {
            transactionId: this.transactionId
        };
        if (this.amount)
            result['amount'] = Math.round(this.amount * 100);
        if (this.description)
            result['description'] = this.description;
        if (this.processDate)
            result['processDate'] = dateFormat(this.processDate, 'dd-mm-yyyy');
        return result;
    };
    return RefundClass;
}(Refund));
exports.RefundClass = RefundClass;
//# sourceMappingURL=refund.js.map