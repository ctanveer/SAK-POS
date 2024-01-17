import axios from "axios";
import { config } from "../config";
import { IUser } from "../interfaces/user.interface";
import { IOrder } from "../interfaces/order.interface";

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


export async function postOrderToKDS (order: IOrder, token: string) {
  try {
    const res = await axios.post<any>(config.SKELETON_URL + '/orders/incoming', { order }, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error posting order to KDS.")
  }
} 