export type DeprecatedTransaction = {
    id: string;
    orderId: string;
    serviceCode: string;
    description: string;
    reference: string;
    ipAddress: string;
    amount: {
        value: number;
        currency: string;
    };
    amountConverted: {
        value: number;
        currency: string;
    };
    amountPaid: {
        value: number;
        currency: string;
    };
    amountRefunded: {
        value: number;
        currency: string;
    };
    status: {
        code: number;
        action: string;
        phase: string;
    };
    paymentData: {
        method: string;
        customerKey: string;
        customerId: string | null;
        customerName: string;
        ipAddress: string;
        secureStatus: boolean;
        paymentVerificationMethod: number;
    };
    paymentMethod: {
        id: number;
        subId: number;
        name: string;
        terminalCode: string;
    };
    integration: {
        testMode: boolean;
    };
    customer: {
        firstName: string | null;
        lastName: string;
        type: string;
        birthDate: string;
        language: string;
        gender: string;
        phone: string;
        email: string;
        ipAddress: string;
        trust: number;
        reference: string;
        bankAccount: {
            iban: string | null;
            bic: string | null;
            owner: string;
        };
        company: {
            name: string;
            coc: string;
            vat: string;
            countryCode: string;
        };
    };
    order: {
        countryCode: string;
        deliveryDate: string;
        invoiceDate: string;
        deliveryAddress: {
            firstName: string | null;
            lastName: string | null;
            streetName: string;
            streetNumber: string;
            streetNumberExtension: string;
            zipCode: string;
            city: string;
            regionCode: string | null;
            countryCode: string;
        };
        invoiceAddress: {
            firstName: string | null;
            lastName: string;
            streetName: string;
            streetNumber: string;
            streetNumberExtension: string;
            zipCode: string;
            city: string;
            regionCode: string | null;
            countryCode: string;
        };
        products: unknown[];
    };
    stats: {
        info: string;
        tool: string;
        object: string;
        extra1: string;
        extra2: string;
        extra3: string;
        domainId: string | null;
    };
    transferData: Record<string, unknown>;
    expiresAt: string;
    createdAt: string;
    createdBy: string | null;
    modifiedAt: string;
    modifiedBy: string | null;
    deletedAt: string | null;
    deletedBy: string | null;
    _links: {
        href: string;
        rel: string;
        type: string;
    }[];
};
