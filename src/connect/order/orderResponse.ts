import { ApiResponse } from '../ApiResponse';
import { Order } from './Order';
import { ApiError } from '../ApiError';

export class OrderResponse {
    private readonly apiResponse: ApiResponse;

    constructor(apiResponse: ApiResponse) {
        this.apiResponse = apiResponse;
    }

    api(): ApiResponse {
        return this.apiResponse;
    }

    order(): Promise<Order> {
        if (this.apiResponse.http().ok) {
            return this.apiResponse.body<Order>();
        }

        throw new ApiError(this.apiResponse);
    }
}
