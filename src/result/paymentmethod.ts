export class Paymentmethod {
    /**
     * The id of the payment method.
     */
    id: number;
    /**
     * The name of the payment method
     */
    name: string;
    /**
     * The name of the payment method.
     * Generally this more descriptive than the name
     */
    visibleName: string;
    /**
     * If the payment method has banks, they are listed here (iDEAL)
     */
    banks?: Bank[];
    /**
     * The countries where the payment method is used.
     */
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
    /**
     * the bank id
     */
    id: number;
    /**
     * The name of the bank
     */
    name: string;
    /**
     * The name of the bank
     */
    visibleName: string;
    /**
     * The url to the image of this bank
     */
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