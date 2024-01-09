export interface ITable {
    _id?: string,
    name: string,
    restaurantId: number,
    type: 'square' | 'rectangle' | 'circle' | 'oval',
    seats: number,
    position: {
      x: number,
      y: number,
      rotation? : number
    },
    status: 'open' | 'reserved' | 'occupied' | 'closed'
}