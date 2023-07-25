import UserProfile from "@/components/UserProfile/UserProfile";
import { Profile } from "@prisma/client";
import {
  ORDERS_ENDPOINT,
  PROFILES_ENDPOINT,
} from "../../../../public/config/constants";
import { OrderWithItemsAndProducts } from "@/types/dataTypes";
const getUser = async (username: string): Promise<Profile | null> => {
  try {
    const res = await fetch(`${PROFILES_ENDPOINT}/?username=${username}`, {
      cache: "no-cache",
    });
    const data: Profile = await res.json();
    return data;
  } catch (err) {
    console.log("error: ", err);
    return null;
  }
};

const getUserOrders = async (
  userId: string
): Promise<OrderWithItemsAndProducts[] | null> => {
  try {
    const res = await fetch(`${ORDERS_ENDPOINT}?userId=${userId}`, {
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error: ", err);
  }
  return null;
};

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);
  const orders: OrderWithItemsAndProducts[] | null = await getUserOrders(
    user?.id || ""
  );
  console.log("orders: ", orders);
  return (
    <div>
      <UserProfile user={user} orders={orders} />
    </div>
  );
}
