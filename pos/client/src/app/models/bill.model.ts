export interface IBill{ 
    orderId: string;
    splitId: number;
    total: number;
    paid: boolean;
    pmtMode: string | null;
}