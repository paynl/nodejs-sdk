import { ResponseAmount } from './Amount.ts';

export type SplitPayment = {
    id: string;    
    amount: ResponseAmount;
    fee: string;
};