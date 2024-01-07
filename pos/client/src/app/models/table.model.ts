export interface ITable {
    id: string,
    name: string,
    type: 'square' | 'rectangle' | 'circle' | 'oval',
    seats: number,
    position: {
      x: number,
      y: number,
      rotation? : number
    }
  }