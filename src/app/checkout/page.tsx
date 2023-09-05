import Checkout from "@/components/Checkout";
import { Profile } from "@prisma/client";
import { getServerSideSession } from "@/utils/serverUtils";
import { getUserProfile } from "@/utils/clientUtils";

export default async function CheckoutPage() {
  const session = await getServerSideSession();
  const profile: Profile | null = await getUserProfile(
    session?.user.user_metadata.username,
    session?.access_token
  );
  return <Checkout profile={profile} session={session} />;
}

export const dynamic = "force-dynamic";
