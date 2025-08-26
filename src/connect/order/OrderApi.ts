import { ApiClientInterface } from '../ApiClient';
import { OrderResponse } from './OrderResponse';
import { PaymentMethod } from './Payment';
import { OrderInformation } from './OrderInformation';
import { Optimize } from './Optimize';
import { Stats } from './Stats';
import { Notification } from './Notification';
import { Customer } from './Customer';
import { CreateAmount } from './Amount';

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
    order?: OrderInformation;
    notification?: Notification;
    stats?: Stats;
    transferData?: Record<string, unknown>;
};

type OrderCreateRequest = OrderCreateOptions & {
    serviceId: string;
};

export class OrderApi {
    private readonly apiClient: ApiClientInterface;

    constructor(apiClient: ApiClientInterface) {
        this.apiClient = apiClient;
    }

    async create(options: OrderCreateOptions): Promise<OrderResponse> {
        const body: OrderCreateRequest = {
            ...options,
            serviceId: this.apiClient.getOptions().serviceId,
        };

        const response = await this.apiClient.post('orders', body);

        return response.body<OrderResponse>();
    }
}
