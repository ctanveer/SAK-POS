export interface IPaymentLog {
    _id?: string;
    orderId: string;
    totalBill: string;
    paid?: boolean;
    pmtMode?: string;
    createdAt: number;
    updatedAt: number;
}