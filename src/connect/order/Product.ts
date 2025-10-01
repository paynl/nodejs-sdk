import { CreateAmount } from './Amount';

export type CreateProduct = {
    id: string;
    quantity: number;
};

export type ResponseProduct = {
    id?: string;
    description?: string;
    /** https://developer.pay.nl/reference/product_type_product_types_get */
    type?: string;
    price: CreateAmount;
    quantity?: number;
    vatPercentage?: number;
};
