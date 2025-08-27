import { CreateAmount } from './Amount';

export type OrderInformation = {
    countryCode?: string;
    deliveryDate?: Date;
    invoiceDate?: Date;
    deliveryAddress?: Address;
    invoiceAddress?: Address;
    products?: Product[];
};

type Address = {
    firstName?: string;
    lastName?: string;
    street?: string;
    streetNumber?: string;
    streetNumberExtension?: string;
    zipCode?: string;
    city?: string;
    country?: string;
    region?: string;
};

type Product = {
    id?: string;
    description?: string;
    /** https://developer.pay.nl/reference/get_product_types */
    type?: string;
    price?: CreateAmount;
    quantity?: number;
    vatPercentage?: number;
};
