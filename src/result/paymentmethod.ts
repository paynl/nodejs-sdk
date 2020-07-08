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
     * The default minimum amount required for starting a transaction
     */
    min_amount: number;
    /**
     * The default maximum amount required for starting a transaction
     */
    max_amount:number;
    /**
     * If the payment method has banks, they are listed here (iDEAL)
     */
    banks?: Bank[];
    /**
     * The countries where the payment method is used.
     */
    countries: Country[];
    /**
     * Brand-information of the payment method
     */
    brand: Brand;

    constructor(data) {
        this.id = data['id'];
        this.name = data['name'];
        this.visibleName = data['visibleName'];
        this.min_amount = data['min_amount'];
        this.max_amount = data['max_amount'];
        if (data['paymentOptionSubList']) {
            this.banks = [];
            for (let bankId in data['paymentOptionSubList']) {
                let bank = data['paymentOptionSubList'][bankId];
                this.banks.push(new Bank(bank));
            }
        }
        if (data['brand']) {
            this.brand = new Brand(data['brand']);
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
export class Brand   {
    id: string;
    name: string;
    image: string;
    public_description: string;

    constructor(data) {
        this.id = data['id'];
        this.name = data['name'];
        this.image = data['image'];
        this.public_description = data['public_description'];
    }
}