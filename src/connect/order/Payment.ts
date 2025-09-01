import { ResponseAmount } from './Amount';
import { PaymentAddress } from './Address';

export type Payment = {
    id: string;
    paymentMethod: PaymentMethod;
    customerType: string | null;
    customerKey: string | null;
    customerId: string | null;
    customerName: string | null;
    customerMethod: string | null;
    ipAddress: string | null;
    secureStatus: boolean;
    paymentVerificationMethod: number;
    status: {
        code: number;
        action: string;
    };
    currencyAmount: ResponseAmount;
    amount: ResponseAmount;
    authorizedAmount: ResponseAmount;
    capturedAmount: ResponseAmount;
    supplierData?: {
        contactDetails: {
            email: string | null;
            firstName: string | null;
            lastName: string | null;
            phoneNumber: string | null;
        };
        invoiceAddress: PaymentAddress;
        shippingAddress: PaymentAddress;
    };
};

export type PaymentMethod = {
    id: number;
    input?:
        | InputGiftcard
        | InputPin
        | InputDirectDebit
        | InputKlarna
        | InputPrzelewy24
        | InputPayByBank
        | InputSprayPay
        | InputPayPal
        | null;
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
