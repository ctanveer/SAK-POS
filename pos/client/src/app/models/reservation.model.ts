export interface IReservation {
    restaurantId: number;
    reservationId: string;
    reservationTime: {
        startTime: number;
        endTime: number;
    };
    customerId: number;
    tableId: string;
    status: string; // reserved, arrived, 
}