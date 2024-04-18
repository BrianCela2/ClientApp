export interface UserRole {
    UserId: string;
    Roles: Roles;
  }
  export interface UserRoleDetail {
    userId: string;
    firstName: string;
    lastName: string;
    roles: Roles;
    newRoles?: Roles;
  }

  export enum Roles {
    Admin = 3,
    Operator = 2
  }