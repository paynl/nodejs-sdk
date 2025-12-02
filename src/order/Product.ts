import { CreateAmount } from './Amount.ts';

export type CreateProduct = {
    id: string;
    quantity: number;
};

export type ResponseProduct = {
    id?: string;
    description?: string;
    /** https://developer.pay.nl/reference/get_product_types */
    type?: string;
    price: CreateAmount;
    quantity?: number;
    vatPercentage?: number;
};
