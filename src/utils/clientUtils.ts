import { Order, Profile } from "@prisma/client";
import {
  ORDERS_ENDPOINT,
  PROFILES_ENDPOINT,
} from "../../public/config/constants";
import { OrderWithItemsAndProducts } from "@/types/dataTypes";
import { CartItem } from "@/context/cartContext";
import { CreateCardPayload } from "@/types/circle";

export const getUserProfile = async (
  username: string | undefined,
  accessToken: string | undefined
): Promise<Profile | null> => {
  try {
    if (!username || !accessToken) return null;
    const response = await fetch(`${PROFILES_ENDPOINT}?username=${username}`, {
      cache: "no-cache",
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    const data: Profile = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const getUserOrders = async (
  userId: string | undefined,
  accessToken: string | undefined
): Promise<OrderWithItemsAndProducts[] | null> => {
  try {
    if (!userId || !accessToken) return null;
    const res = await fetch(`${ORDERS_ENDPOINT}?userId=${userId}`, {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error: ", err);
  }
  return null;
};

export const createOrder = async (
  profileId: string | undefined,
  accessToken: string | undefined,
  items: CartItem[]
): Promise<Order | null> => {
  try {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify({
        profileId: profileId,
        items: items,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createPayment = async (
  orderId: string | undefined,
  accessToken: string | undefined,
  cardPayload: CreateCardPayload | undefined
): Promise<any | null> => {
  try {
    if (!orderId || !accessToken || !cardPayload) return null;
    const response = await fetch("/api/circle/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //body will include the cardPayload and the id of the order
      body: JSON.stringify({
        orderId: orderId || "",
        cardPayload: cardPayload,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
