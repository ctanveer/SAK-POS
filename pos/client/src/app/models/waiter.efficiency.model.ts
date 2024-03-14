export interface IWaiterEfficiency {
    date: number;
    orderId: string;
    preparationTime: number;
    orderReadyToServeTime: number;
    bill: number; 
    occupiedToCompleteTime: number;
    waiterId: number;
    restaurantId: number;
}