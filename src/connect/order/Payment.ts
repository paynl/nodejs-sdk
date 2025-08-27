export type PaymentMethod = {
    id?: number;
    input?:
        | InputGiftcard
        | InputPin
        | InputDirectDebit
        | InputKlarna
        | InputPrzelewy24
        | InputPayByBank
        | InputSprayPay
        | InputPayPal;
};

type InputGiftcard = {
    cardNumber: string;
    pincode: string;
};

type InputPin = {
    terminalCode: string;
    terminalPin?: string;
};

type InputDirectDebit = {
    firstName?: string;
    lastName?: string;
    email?: string;
    city?: string;
    iban?: string;
    bic?: string;
    permissionGiven: boolean;
};

type InputKlarna = {
    countryCode: string;
};

type InputPrzelewy24 = {
    email: string;
};

type InputPayByBank = {
    issuerId?: string;
    country?: string;
    debtorIban?: string;
    psuId?: string;
};

type InputSprayPay = {
    initials: string;
    firstName: string;
    lastName: string;
    gender: 'FEMALE' | 'MALE';
    streetName: string;
    houseNumber: string;
    houseNumberAddition?: string;
    postalCode: string;
    city: string;
    country: 'NL' | 'BE';
    email: string;
    phoneNumber: string;
};

type InputPayPal = {
    orderId: string;
};
