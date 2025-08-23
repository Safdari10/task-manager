import { jwtDecode } from "jwt-decode";

export interface JWTPayload {
  exp?: number;
  [key: string]: unknown;
}

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isTokenExpired = (payload: JWTPayload): boolean => {
  if (!payload.exp) return false;
  return payload.exp * 1000 < Date.now();
};
