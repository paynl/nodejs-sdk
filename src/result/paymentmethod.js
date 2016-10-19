"use strict";
var Paymentmethod = (function () {
    function Paymentmethod(data) {
        var _this = this;
        this.id = data['id'];
        this.name = data['name'];
        this.visibleName = data['visibleName'];
        if (data['paymentOptionSubList']) {
            this.banks = [];
            for (var bankId in data['paymentOptionSubList']) {
                var bank = data['paymentOptionSubList'][bankId];
                this.banks.push(new Bank(bank));
            }
        }
        if (data['countries']) {
            this.countries = [];
            data['countries'].forEach(function (country) {
                _this.countries.push(new Country(country));
            });
        }
    }
    return Paymentmethod;
}());
exports.Paymentmethod = Paymentmethod;
var Bank = (function () {
    function Bank(data) {
        this.id = data['id'];
        this.name = data['name'];
        this.visibleName = data['visbileName'];
        this.img = data['img'];
        this.available = data['state'];
    }
    return Bank;
}());
exports.Bank = Bank;
var Country = (function () {
    function Country(data) {
        this.code = data['id'];
        this.name = data['name'];
    }
    return Country;
}());
exports.Country = Country;
//# sourceMappingURL=paymentmethod.js.map