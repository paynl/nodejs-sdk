"use strict";
class StartResult {
    constructor(data) {
        this.transactionId = data.transactionId;
        this.paymentURL = data.paymentURL;
        this.popupAllowed = data.popupAllowed;
        this.paymentReference = data.paymentReference;
    }
}
exports.StartResult = StartResult;
//# sourceMappingURL=start.js.map