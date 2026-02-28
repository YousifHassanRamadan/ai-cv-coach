export interface RegisterPayload {
  fName: string;
  lName: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  message: string;
  message_ar: string;
  token: string;
  refreshToken: string;
}

export interface User {
  id: string;
  fName: string;
  lName: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface RegisterResponse {
  message: string;
  message_ar: string;
  user: User;
}

export interface RefreshResponse {
  message: string;
  message_ar: string;
  token: string;
  refreshToken: string;
}
