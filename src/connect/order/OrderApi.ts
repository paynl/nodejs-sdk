import { ApiClientInterface } from '../ApiClient';
import { Order } from './Order';
import { ValidationError } from '../ValidationError';

type Integration = {
    test?: boolean;
    pointOfInteraction?: string;
};

export type OrderCreateOptions = {
    description?: string;
    reference?: string;
    expire?: Date;
    returnUrl?: string;
    exchangeUrl?: string;
    amount: Amount;
    paymentMethod?: PaymentMethod;
    integration?: Integration;
    optimize?: Optimize;
    customer?: Customer;
    notification?: Notification;
    stats?: Stats;
};

type Amount = {
    value: number;
    currency?: string;
};

type PaymentMethod = {
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

type Customer = {
    email?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: Date | string;
    gender?: string;
    phone?: string;
    language?: string;
    /** Locale code like "en_US" or "nl_BE" */
    locale?: string;
    ipAddress?: string;
    trust?: number;
    reference?: string;
    gaClientId?: string;
    company?: {
        name?: string;
        cocNumber?: string;
        vatNumber?: string;
        country?: string;
    };
};

type Notification = {
    type?: 'push' | 'email';
    recipient?: string;
};

type Stats = {
    tool?: string;
    info?: string;
    object?: string;
    extra1?: string;
    extra2?: string;
    extra3?: string;
    domainId?: string;
    promotorId?: number;
};

type OrderCreateRequest = OrderCreateOptions & {
    serviceId: string;
};

type OrderCreateResponse = Order;

export class OrderApi {
    private readonly apiClient: ApiClientInterface;

    constructor(apiClient: ApiClientInterface) {
        this.apiClient = apiClient;
    }

    async create(options: OrderCreateOptions): Promise<OrderCreateResponse> {
        // TODO: how should we handle validation and errors?
        if (options.reference && options.reference.match(/[^a-zA-Z0-9]/)) {
            throw new ValidationError(
                'The order reference may only contain alphanumeric characters.',
            );
        }

        const body: OrderCreateRequest = {
            ...options,
            serviceId: this.apiClient.getOptions().serviceId,
        };

        const response = await this.apiClient.post('orders', body);

        return response.body<OrderCreateResponse>();
    }
}
