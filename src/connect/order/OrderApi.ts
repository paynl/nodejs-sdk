import { ApiClientInterface } from '../ApiClient';
import { Order } from './Order';
import { ConnectApiRequest } from '../ConnectApiRequest';
import { OrderCreateOptions } from './CreateOrderOptions';
import { PaymentMethod } from './Payment';
import { CreateProduct } from './Product';
import { RestApiRequest } from '../RestApiRequest';
import { DeprecatedTransaction } from '../transaction/DeprecatedTransaction';
import { isNotTguOrder } from './isNotTguOrder';

export class OrderApi {
    constructor(private readonly apiClient: ApiClientInterface) {}

    /**
     * Create an order on this TGU. An order represents the total order as it exists in your shop and can be fulfilled through one or more payments.
     *
     * Once you have created an order, you should redirect the user to the URL in the `links.redirect` object.
     *
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

    /**
     * Retrieve the current status of an order along with its corresponding payment attempts.
     *
     * @see https://developer.pay.nl/reference/api_get_status-1
     * @see https://developer.pay.nl/reference/get_transactions-transactionid
     */
    async get(orderId: string): Promise<Order | DeprecatedTransaction> {
        if (isNotTguOrder(orderId)) {
            const response = await this.apiClient.request(
                new RestApiRequest(`v2/transactions/${orderId}`),
            );
            return await response.body<DeprecatedTransaction>();
        }

        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/status`),
        );
        return await response.body<Order>();
    }

    /**
     * Retrieve the current status of an order along with its corresponding payment attempts.
     *
     * @see https://developer.pay.nl/reference/api_get_status-1
     */
    async status(orderId: string): Promise<Order['status'] | DeprecatedTransaction['status']> {
        const order = await this.get(orderId);
        return order.status;
    }

    /**
     * Update an order with a reference and/or description. This action is only allowed available for orders of the type
     * 'payment_based_checkout' and only if the value to update is currently not set.
     *
     * @see https://developer.pay.nl/reference/api_update_order-1
     */
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

    /**
     * Approve an order that is flagged for a risk check by the Verify module, continuing the regular order flow.
     *
     * @see https://developer.pay.nl/reference/api_approve_order-1
     */
    async approve(orderId: string): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/approve`, {
                method: 'PATCH',
            }),
        );
        return await response.body<Order>();
    }

    /**
     * Decline an order that is flagged for a risk check by the Verify module, refunding all payments made on this order.
     *
     * @see https://developer.pay.nl/reference/api_decline_order-1
     */
    async decline(orderId: string): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/decline`, {
                method: 'PATCH',
            }),
        );
        return await response.body<Order>();
    }

    /**
     * Capture an order that has an active reservation (Status 95). Reservations are commonly used for CreditCard and
     * Buy now, Pay later payments. By using this API, the entire order will be captured.
     *
     * @see https://developer.pay.nl/reference/api_capture_order-1
     */
    async capture(orderId: string): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/capture`, {
                method: 'PATCH',
            }),
        );
        return await response.body<Order>();
    }

    /**
     * Capture a specific amount on an order that has an active reservation (Status 95). Reservations are commonly used
     * for CreditCard and Buy now, Pay later payments. With this API, you can capture a specific amount from the order
     * while the reservation remains active.
     *
     * @see https://developer.pay.nl/reference/api_capture_amount-1
     */
    async captureWithAmount(orderId: string, amountInCents: number): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/capture/amount`, {
                method: 'PATCH',
                json: { amount: amountInCents },
            }),
        );
        return await response.body<Order>();
    }

    /**
     * Capture an order that has an active reservation (Status 95). Reservations are commonly used for CreditCard and
     * Buy now, Pay later payments. By using this API, the entire order will be captured.
     *
     * @see https://developer.pay.nl/reference/api_capture_products-1
     */
    async captureWithProducts(orderId: string, products: CreateProduct[]): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/capture/products`, {
                method: 'PATCH',
                json: { products: products },
            }),
        );
        return await response.body<Order>();
    }

    /**
     * Append a new payment based on an existing pending order. When the summed amount of all completed payments reaches
     * the order amount, the order will be completed.
     *
     * @see https://developer.pay.nl/reference/api_create_order_payment
     */
    async payment(orderId: string, paymentMethod: PaymentMethod): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/payments`, {
                method: 'POST',
                json: { paymentMethod: paymentMethod },
            }),
        );
        return await response.body<Order>();
    }

    /**
     * Cancel an order with an active reservation (Status 95), voiding all payments made for that order as well.
     *
     * @see https://developer.pay.nl/reference/api_void_order-1
     */
    async void(orderId: string): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/void`, {
                method: 'PATCH',
            }),
        );
        return await response.body<Order>();
    }

    /**
     * Abort an order, halting the regular order flow and voiding any payment attempts made to fulfill this order.
     *
     * @see https://developer.pay.nl/reference/api_abort_order-1
     */
    async abort(orderId: string): Promise<Order> {
        const response = await this.apiClient.request(
            new ConnectApiRequest(`v1/orders/${orderId}/abort`, {
                method: 'PATCH',
            }),
        );
        return await response.body<Order>();
    }
}
