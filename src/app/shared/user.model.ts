
export interface Login {
    Email: string;
    Password: string;
  }

export interface Register {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    PhoneNumber: string;
    Birthday: Date;
    Country:string;
    City:string;
  }

  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    birthday?: Date | null;
    country: string;
    city: string;
  }

  
  