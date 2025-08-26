import { ResponseAmount } from './Amount';

type Order = {
    id: string;
    type: string;
    serviceId: string;
    description: string | null;
    reference: string | null;
    manualTransferCode: string;
    orderId: string;
    uuid: string;
    customerKey: string | null;
    status: {
        code: number | null;
        action: string | null;
    };
    receipt: string | null;
    integration: {
        pointOfInteraction: string | null;
        test: boolean;
    };
    stats: {
        extra1: string | null;
        extra2: string | null;
        extra3: string | null;
        tool: string | null;
        info: string | null;
        object: string | null;
        promotorId: number | null;
        domainId: string | null;
    };
    transferData: Record<string, unknown>;
    amount: ResponseAmount;
    authorizedAmount: ResponseAmount;
    capturedAmount: ResponseAmount;
    checkoutData: null | {
        customer: {
            email: string | null;
            firstName: string | null;
            lastName: string | null;
            dateOfBirth: string | null;
            gender: string | null;
            phone: string | null;
            locale: string | null;
            ipAddress: string | null;
            reference: string | null;
            company: {
                name: string | null;
                cocNumber: string | null;
                vatNumber: string | null;
                country: string | null;
            };
            billingAddress: {
                firstName: string | null;
                lastName: string | null;
                streetName: string | null;
                streetNumberAddition: string | null;
                zipCode: string | null;
                city: string | null;
                countryCode: string | null;
                regionCode: string | null;
            };
            shippingAddress: {
                firstName: string | null;
                lastName: string | null;
                streetName: string | null;
                streetNumberAddition: string | null;
                zipCode: string | null;
                city: string | null;
                countryCode: string | null;
                regionCode: string | null;
            };
        };
    };
    payments: Payment[];
    createdAt: string;
    createdBy: string | null;
    modifiedAt: string;
    modifiedBy: string | null;
    expiresAt: string;
    completedAt: string | null;
    links: {
        status: string;
        abort: string;
        approve: string;
        decline: string;
        void: string;
        capture: string;
        captureAmount: string;
        captureProducts: string;
        debug: string;
        checkout: string;
        redirect: string;
    };
};

type Payment = {
    id: string;
    paymentMethod: {
        id: number;
        input: Record<string, unknown> | null;
    };
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
    supplierData: SupplierData | null;
};

type SupplierData = {
    contactDetails: {
        email: string | null;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string | null;
    };
    invoiceAddress: Address;
    shippingAddress: Address;
};

type Address = {
    firstName: string | null;
    lastName: string | null;
    street: string | null;
    houseNumber: string | null;
    addition: string | null;
    postalCode: string | null;
    city: string | null;
    companyName: string | null;
    countryName: string | null;
};

export type OrderCreateResponse = Order;
