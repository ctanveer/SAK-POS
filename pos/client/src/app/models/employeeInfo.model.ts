import { IPosition } from "./position.model";

export interface IEmployeeInfo {
  id: number;
  restaurantId: number;
  name: string;
  email: string;
  experience: string[];
  phoneNumber: number | string;
  address: string;
  skillTags: string[];
  hourlyRate: number;
  efficiency: string;
  createdAt: Date;
  updatedAt: Date;
  applicantId: number | null;
  position: IPosition
}
