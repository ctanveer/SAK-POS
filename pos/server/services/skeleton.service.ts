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

// const menuUrl = 'https://bento-menu-omi5.koyeb.app/menuItem/restaurant/1'

export async function getMenuFromMenuBuilder(token: string) {
  try {
    const res = await axios.get<any>(config.SKELETON_URL + '/menu/one-restaurant-menu', { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting menu from Menu Builder.")
  }
}

export async function getCategoriesFromMenuBuilder(token: string) {
  try {
    const res = await axios.get<any>(config.SKELETON_URL + '/menu/all-menu-categories', { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting categories from Menu Builder.")
  }
}