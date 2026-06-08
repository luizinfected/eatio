export type UserDTO = {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  documentNumber: string;
  documentType: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
  password?: string;
  address?: {
    id?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: string;
    userId?: string;
  };
};
