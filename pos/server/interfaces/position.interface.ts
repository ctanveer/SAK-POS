export interface IPosition {
  id: number;
  position: string;
  employeeId: number;
  restaurantId: number;
  services: string[];
  createdAt: Date;
  updatedAt: Date;
}