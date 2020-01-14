export class Service {
    /**
     *  Service ID for which this gift card has been activated. A service ID always starts with SL-
     */
    service: string;
}
export class CheckResult {
    /**
     *  Gift card type
     */
    type: string;
    /**
     *  1: Gift card must be cashed with PIN code 0: Gift card can be cashed without PIN code
     */
    withPin: string;
    /**
     * Payment option ID of the gift card
     */
    paymentOptionId: boolean;
    /**
     *  Name of the gift card
     */
    paymentProfileName: string;
    /**
     *  URL of a 100x100 image of the gift card
     */
    profileIconUrl: string;
    /**
     *  Balance on gift card in cents
     */
    balance: string;
    /**
     *  Array with services for which the gift card has been activated
     */
    services: Service[]

    constructor(data) {
        this.type = data.card.type;
        this.withPin = data.card.withPin;
        this.paymentOptionId = data.card.paymentOptionId;
        this.paymentProfileName = data.card.paymentProfileNamer;
        this.profileIconUrl = data.card.profileIconUrl;
        this.balance = data.card.balance;
        this.services = data.card.services;
    }
}