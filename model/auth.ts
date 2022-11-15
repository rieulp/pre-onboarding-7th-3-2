export interface LoginResponse {
  accessToken: string;
  user: {
    email: 'string';
    id: number;
  };
}

export interface ErrorResponse {
  error: string;
}

export interface SuccessResponse {
  success: string;
}
