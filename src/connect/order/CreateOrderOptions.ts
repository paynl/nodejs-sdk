import { CreateAmount } from './Amount';
import { PaymentMethod } from './Payment';
import { Customer } from './Customer';
import { Stats } from './Stats';
import { PostalAddress } from './Address';
import { ResponseProduct } from './Product';

export type OrderCreateOptions = {
    description?: string;
    reference?: string;
    expire?: Date;
    returnUrl?: string;
    exchangeUrl?: string;
    amount: CreateAmount;
    paymentMethod?: PaymentMethod;
    integration?: {
        test?: boolean;
        pointOfInteraction?: string;
    };
    optimize?: Optimize;
    customer?: Customer;
    order?: {
        countryCode?: string;
        deliveryDate?: Date;
        invoiceDate?: Date;
        deliveryAddress?: PostalAddress;
        invoiceAddress?: PostalAddress;
        products?: ResponseProduct[];
    };
    notification?: {
        type?: 'push' | 'email';
        recipient?: string;
    };
    stats?: Stats;
    transferData?: Record<string, unknown>;
};

type Optimize = {
    flow?: 'fastCheckout';
    shippingAddress?: boolean;
    billingAddress?: boolean;
    contactDetails?: boolean;
    mcc?: string;
    collectorAccount?: {
        method: string;
        iban: {
            iban: string;
            bic: string;
            owner: string;
        };
    };
    collectorCompany?: {
        id: string;
        name: string;
        countryCode: string;
    };
};
