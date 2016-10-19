"use strict";
class Paymentmethod {
    constructor(data) {
        this.id = data['id'];
        this.name = data['name'];
        this.visibleName = data['visibleName'];
        if (data['paymentOptionSubList']) {
            this.banks = [];
            for (let bankId in data['paymentOptionSubList']) {
                let bank = data['paymentOptionSubList'][bankId];
                this.banks.push(new Bank(bank));
            }
        }
        if (data['countries']) {
            this.countries = [];
            data['countries'].forEach((country) => {
                this.countries.push(new Country(country));
            });
        }
    }
}
exports.Paymentmethod = Paymentmethod;
class Bank {
    constructor(data) {
        this.id = data['id'];
        this.name = data['name'];
        this.visibleName = data['visbileName'];
        this.img = data['img'];
        this.available = data['state'];
    }
}
exports.Bank = Bank;
class Country {
    constructor(data) {
        this.code = data['id'];
        this.name = data['name'];
    }
}
exports.Country = Country;
//# sourceMappingURL=paymentmethod.js.map