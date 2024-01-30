import axios from "axios";
import { config } from "../config";
import { IUser } from "../interfaces/user.interface";
import { IOrder } from "../interfaces/order.interface";
import { ReservationInterface } from "../interfaces/reservation.interface";

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
    // console.log('In getUserFromToken: ')
    return res.data;
  } catch (error) {
    console.log(error);
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

export async function postStatusUpdateToKDS (order: IOrder, token: string) {
  try {
    const res = await axios.post<any>(config.SKELETON_URL + `/pos/order/served/${order._id}`, { order }, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating order status to KDS.")
  }
}

// const menuUrl = 'https://bento-menu-omi5.koyeb.app/menuItem/restaurant/1'

export async function getMenuFromMenuBuilder(token: string, restaurantId: number) {
  try {
    const res = await axios.get<any>(config.SKELETON_URL + `/menu/one-restaurant-menu/${restaurantId}`, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting menu from Menu Builder.")
  }
}

export async function getCategoriesFromMenuBuilder(token: string, restaurantId: number) {
  try {
    const res = await axios.get<any>(config.SKELETON_URL + `/menu/all-menu-categories/${restaurantId}`, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting categories from Menu Builder.")
  }
}

export async function postWaiterdataToHR (waiterData: any, token: string) {
  try {
    const res = await axios.post<any>(config.SKELETON_URL + '/hr/waiter-efficiency', waiterData, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error posting waiter data to HR.")
  }
}


//TESTING
export async function getAllReservationsForToday(token: string, restaurantId: string, date: string) {
  try {
    const res = await axios.get<any>(config.SKELETON_URL + `/pos/reservation-by-date/restaurant/${restaurantId}/date/${date}`, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting reservation data for today")
  }
}

export async function getAllReservations(token: string, restaurantId: string) {
  try {
    const res = await axios.get<any>(config.SKELETON_URL + `/pos/all-reservations/${restaurantId}`, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting all reservations data")
  }
}

export async function postStatusUpdateToReservations (token: string, restaurantId: number, reservation: ReservationInterface) {
  try {
    const res = await axios.post<any>(config.SKELETON_URL + `/reservation/status-update/${restaurantId}/${reservation._id}`, reservation, { headers: { 'Authorization': token }});
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating status update to Reservations.")
  }
}