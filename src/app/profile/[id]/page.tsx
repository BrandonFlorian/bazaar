import UserProfile from "@/components/UserProfile/UserProfile";
import { OrderWithItemsAndProducts } from "@/types/dataTypes";
import { getUserOrders, getUserProfile } from "@/utils/clientUtils";
import { getServerSideSession } from "@/utils/serverUtils";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSideSession();
  const user = await getUserProfile(params.id, session?.access_token);
  const orders: OrderWithItemsAndProducts[] | null = await getUserOrders(
    user?.id,
    session?.access_token
  );

  return (
    <div>
      <UserProfile user={user} orders={orders} />
    </div>
  );
}
