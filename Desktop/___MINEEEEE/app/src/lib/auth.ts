import { jwtDecode } from "jwt-decode";
import { User } from "./types";

export const getAuthenticatedUser = (): User => {
  const token = localStorage.getItem("token") as string;
  const decodedToken = jwtDecode<User>(token);
  return decodedToken;
};

export const getAuthenticatedUserToken = (): string | null => {
  return localStorage.getItem("token");
};

export const storeAuthenticatedUserToken = (token: string): void => {
  localStorage.setItem("token", token);
};


export const removeAuthenticatedUserToken = (): void => {
  localStorage.removeItem("token");
};

// check if roken expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTimestamp = Date.now() / 1000; 
    return decodedToken.exp < currentTimestamp;
  } catch (error) {
    return true;
  }
};
