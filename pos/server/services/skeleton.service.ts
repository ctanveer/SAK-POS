import axios from "axios";
import { config } from "../config";

export async function getTokenFromCode (code: string) {
  try {
    const res = await axios.get(config.SKELETON_URL + "/service-auth/token/" + code);
    return res;
  } catch (error) {
    throw new Error("Error getting token from code.");
  }
}