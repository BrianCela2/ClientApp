
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
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Birthday?: Date | null;
    Country: string;
    City: string;
  }

  
  