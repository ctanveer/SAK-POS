export interface IReservation {
    reservationId: string;
    reservationTime: {
        startTime: number;
        endTime: number;
    };
    customerId: number;
    tableId: string;
    status: string;
}