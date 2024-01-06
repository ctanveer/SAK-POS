export interface ITable {
    restaurantId: number;
    name: string;
    type: string;
    seats: number;
    position: {
        x: number,
        y: number,
        rotation? : number
    };
    status: string;
}