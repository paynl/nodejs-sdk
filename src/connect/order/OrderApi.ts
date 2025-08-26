import { ApiClientInterface } from '../ApiClient';
import { OrderCreateResponse } from './Order';
import { PaymentMethod } from './Payment';
import { Order } from './CreateOrder';
import { Optimize } from './Optimize';
import { Integration } from './Integration';
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
    integration?: Integration;
    optimize?: Optimize;
    customer?: Customer;
    order?: Order;
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

    async create(options: OrderCreateOptions): Promise<OrderCreateResponse> {
        const body: OrderCreateRequest = {
            ...options,
            serviceId: this.apiClient.getOptions().serviceId,
        };

        const response = await this.apiClient.post('orders', body);

        return response.body<OrderCreateResponse>();
    }
}
