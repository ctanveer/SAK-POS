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