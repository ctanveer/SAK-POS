export interface IReservation {
    restaurantId: number;
    reservationId: string;
    reservationTime: {
        startTime: number;
        endTime: number;
    };
    customerId: number;
    tableId: string;
    status: string; // reserved, arrived, no-show, cancelled
}


//interface being used by reservation silo
export interface ReservationInterface {
    _id: string;
    restaurantId: string;
    tableId: string;
    userId: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    numberOfPeople: number;
    createdAt: Date;
    status: string;
    userName: string;
    userEmail: string;
    phoneNumber: string;
}