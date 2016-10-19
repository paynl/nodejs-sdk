export class Paymentmethod {
    id: number;
    name: string;
    visibleName: string;
    banks?: Bank[];
    countries: Country[];

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
export class Bank {
    id: number;
    name: string;
    visibleName: string;
    img: string;
    available: boolean;

    constructor(data) {
        this.id = data['id'];
        this.name = data['name'];
        this.visibleName = data['visbileName'];
        this.img = data['img'];
        this.available = data['state'];
    }
}
export class Country {
    code: string;
    name: string;

    constructor(data) {
        this.code = data['id'];
        this.name = data['name'];
    }
}