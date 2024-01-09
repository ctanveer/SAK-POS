import axios from "axios";
import { config } from "../config";
import { IUser } from "../interfaces/user.interface";

export async function getTokenFromCode (code: string) {
  try {
    const res = await axios.get(config.SKELETON_URL + "/service-auth/token/" + code);
    return res;
  } catch (error) {
    throw new Error("Error getting token from code.");
  }
}

export async function getUserFromToken (token: string) {
  try {
    const res = await axios.get<{ user: IUser }>(config.SKELETON_URL + '/service-auth/user-from-token', { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    throw new Error("Error getting user from token.")
  }
} 