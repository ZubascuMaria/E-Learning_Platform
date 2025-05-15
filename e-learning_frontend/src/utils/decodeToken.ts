import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  userId: number;
  role: string;
  iat: number; 
  exp: number; 
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};