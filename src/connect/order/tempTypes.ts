// @todo merge/transform/refactor type after the create endpoint PR is finished
export type OrderWithStatus = {
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
        code: number;
        action: string;
    };
    receipt: unknown | null;
    integration: {
        pointOfInteraction: unknown | null;
        test: boolean;
    };
    stats: {
        extra1: string | null;
        extra2: string | null;
        extra3: string | null;
        tool: string | null;
        info: string | null;
        object: string | null;
        promotorId: string | null;
        domainId: string | null;
    };
    transferData: Record<string, unknown>;
    amount: {
        value: number;
        currency: string;
    };
    authorizedAmount: {
        value: number;
        currency: string;
    };
    capturedAmount: {
        value: number;
        currency: string;
    };
    checkoutData: unknown | null;
    payments: {
        id: string;
        paymentMethod: unknown;
        customerType: string | null;
        customerKey: string | null;
        customerId: string;
        customerName: string | null;
        customerMethod: string | null;
        ipAddress: string;
        secureStatus: boolean;
        paymentVerificationMethod: number;
        status: unknown;
        currencyAmount: unknown;
        amount: unknown;
        authorizedAmount: unknown;
        capturedAmount: unknown;
        supplierData: unknown | null;
        recurring: boolean;
    }[];
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string | null;
    expiresAt: string;
    completedAt: string;
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
