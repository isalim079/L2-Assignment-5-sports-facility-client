export type TFacility = {
    _id: string;
    name: string;
    description: string;
    pricePerHour: number;
    image: string;
    facilityType: "topFacility" | "normalFacility";
    location: string;
    isDeleted: boolean
  }
  
  export type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: "admin" | "user";
    address: string;
  };
  
  export type TBooking = {
    _id: string
    date: string;
    startTime: string;
    endTime: string;
    user: TUser;
    facility: TFacility;
    payableAmount: number;
    isBooked: 'confirmed' | 'unconfirmed' | 'canceled'
  }