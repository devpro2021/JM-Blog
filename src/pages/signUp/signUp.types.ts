export interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
}

export interface Errors {
  email?: string;
  username?: string;
}
export interface IError {
  errors: Errors;
}
