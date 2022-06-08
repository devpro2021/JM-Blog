import { AxiosResponse } from 'axios';

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

export interface iServerErrorData {
  errors: {
    username?: string;
    email?: string;
  };
}
export interface iServerError extends AxiosResponse {
  data: iServerErrorData;
}
