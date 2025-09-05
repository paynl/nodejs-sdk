import { ResponseAmount } from './Amount';
import { Payment } from './Payment';
import { NewAddress } from './Address';
import { Company } from './Customer';
import { Stats } from '../shared';

export type Order = {
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
    stats: Stats;
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
            company: Company;
        };
        billingAddress: NewAddress;
        shippingAddress: NewAddress;
    };
    payments: Payment[];
    createdAt: string;
    createdBy: string | null;
    modifiedAt: string;
    modifiedBy: string | null;
    expiresAt: string;
    completedAt: string | null;
    links: Links;
};

type Links = {
    status: string;
    abort: string;
    approve?: string;
    decline?: string;
    void?: string;
    capture?: string;
    captureAmount?: string;
    captureProducts?: string;
    debug?: string;
    checkout?: string;
    redirect: string;
};
