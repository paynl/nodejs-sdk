import { ApiClientInterface } from '../ApiClient';
import { OrderResponse } from './OrderResponse';
import { PaymentMethod } from './Payment';
import { OrderInformation } from './OrderInformation';
import { Optimize } from './Optimize';
import { Stats } from './Stats';
import { Notification } from './Notification';
import { Customer } from './Customer';
import { CreateAmount } from './Amount';
import { OrderWithStatus } from './tempTypes';
import { ConnectApiRequest } from '../ConnectApiRequest';

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
    constructor(private readonly apiClient: ApiClientInterface) {}

    /**
     * Creating an order is the first step in making a payment.
     *
     * Once you have created an order, you should redirect the user to the URL in the `links.redirect` object.
     *
     * @example
     * const order = await client.Orders.create({ ... });
     * console.log('Redirect:', order.links.redirect);
     * @see https://developer.pay.nl/reference/api_create_order-1
     */
    async create(options: OrderCreateOptions): Promise<OrderResponse> {
        const body: OrderCreateRequest = {
            ...options,
            serviceId: this.apiClient.getOptions().serviceId,
        };

        const response = await this.apiClient.request(
            new ConnectApiRequest('v1/orders', { method: 'POST', json: body }),
        );

        return response.body<OrderResponse>();
    }

    async get(orderId: string): Promise<OrderWithStatus> {
        const response = await this.apiClient.get(`orders/${orderId}/status`);
        return await response.body<OrderWithStatus>();
    }

    async status(orderId: string): Promise<OrderWithStatus['status']> {
        const order = await this.get(orderId);
        return order.status;
    }

    async update(
        orderId: string,
        reference?: string,
        description?: string,
    ): Promise<OrderWithStatus> {
        const response = await this.apiClient.patch(`orders/${orderId}`, {
            reference: reference,
            description: description,
        });
        return await response.body<OrderWithStatus>();
    }

    async approve(orderId: string): Promise<OrderWithStatus> {
        const response = await this.apiClient.patch(`orders/${orderId}/approve`, null);
        return await response.body<OrderWithStatus>();
    }

    async decline(orderId: string): Promise<OrderWithStatus> {
        const response = await this.apiClient.patch(`orders/${orderId}/decline`, null);
        return await response.body<OrderWithStatus>();
    }

    async capture(orderId: string): Promise<OrderWithStatus> {
        const response = await this.apiClient.patch(`orders/${orderId}/capture`, null);
        return await response.body<OrderWithStatus>();
    }
}
