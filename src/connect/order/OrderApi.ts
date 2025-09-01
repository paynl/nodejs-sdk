import { ApiClientInterface } from '../ApiClient';
import { Order } from './Order';
import { ConnectApiRequest } from '../ConnectApiRequest';
import { OrderCreateOptions } from './CreateOrderOptions';

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
    async create(options: OrderCreateOptions): Promise<Order> {
        const body = {
            ...options,
            serviceId: this.apiClient.getOptions().serviceId,
        };

        const response = await this.apiClient.request(
            new ConnectApiRequest('v1/orders', { method: 'POST', json: body }),
        );

        return response.body<Order>();
    }

    async get(orderId: string): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/status`),
        );
        return await response.body<Order>();
    }

    async status(orderId: string): Promise<Order['status']> {
        const order = await this.get(orderId);
        return order.status;
    }

    async update(orderId: string, reference?: string, description?: string): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}`, {
                method: 'PATCH',
                json: {
                    reference: reference,
                    description: description,
                },
            }),
        );
        return await response.body<Order>();
    }

    async approve(orderId: string): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/approve`, {
                method: 'PATCH',
            }),
        );
        return await response.body<Order>();
    }

    async decline(orderId: string): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/decline`, {
                method: 'PATCH',
            }),
        );
        return await response.body<Order>();
    }

    async capture(orderId: string): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/capture`, {
                method: 'PATCH',
            }),
        );
        return await response.body<Order>();
    }
}
