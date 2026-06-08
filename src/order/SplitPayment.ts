import { ResponseAmount } from './Amount.ts';

export type SplitPayment = {
    serviceId: string;
    amount: ResponseAmount;
    fee: string;
};
