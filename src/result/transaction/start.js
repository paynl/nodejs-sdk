"use strict";
var StartResult = (function () {
    function StartResult(data) {
        this.transactionId = data.transactionId;
        this.paymentURL = data.paymentURL;
        this.popupAllowed = data.popupAllowed;
        this.paymentReference = data.paymentReference;
    }
    return StartResult;
}());
exports.StartResult = StartResult;
//# sourceMappingURL=start.js.map