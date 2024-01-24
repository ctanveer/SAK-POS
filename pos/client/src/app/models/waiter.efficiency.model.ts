export interface IWaiterEfficiency {
    date: number;   //unix -- createdAt from Order
    orderId: string;    // from Order
    preparationTime: number;    //MINS -- add of all items(incl. quantity) standard preparation time
    orderReadyToServeTime: number;  //MINS -- order | servedTimestamp - readyTimestamp
    bill: number;   //order | bill
    occupiedToCompleteTime: number;     // MINS -- tableLog | timeElapsed
    waiterId: number;      //from user.employeeInformation.id
    restaurantId: number;   //from user.employeeInformation.restaurantId
}