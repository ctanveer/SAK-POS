export interface IUser {
    name: string;
    email: string;
    password: string;
    image: string;
    address: string;
  }
  export interface ILongLat {
    longitude: number;
    latitude: number;
  }
  export interface ICustomerPreference {
    tastyTags: Object;
    category: [String];
  }
  // export interface IAddress {
  //   address: string,
  //   buildingName: string,
  //   buildingType: string,
  //   floor: string,
  // }
  export interface ICustomer {
    _id?: string;
    name: string;
    dob: Date;
    age?: number;
    customerImage?: string;
    phoneNumber: string;
    email: string;
    password: string;
    address: string;
    currentLatLong?: ILongLat;
    doorwayLatLong?: ILongLat;
    allOrderIdList: string[];
    customerPreference: ICustomerPreference; // Tasty Tag Enums from Menu
    loyaltyPoints?: number;
    uprn: string;
  }