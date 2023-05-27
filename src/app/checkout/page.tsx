import Checkout from "@/components/Checkout";
import { cookies, headers } from "next/headers";
import {
  type Session,
  createServerComponentSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { Profile } from "@prisma/client";
import { PROFILES_ENDPOINT } from "../../../public/config/constants";

const getUser = async (username: string): Promise<Profile | null> => {
  try {
    const res = await fetch(`${PROFILES_ENDPOINT}?username=${username}`, {
      cache: "no-cache",
    });
    const data: Profile = await res.json();
    return data;
  } catch (err) {
    console.log("error: ", err);
    return null;
  }
};

const getProfile = async (): Promise<Profile | null> => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });
  const sessionData = await supabase.auth.getSession();
  const session: Session | null = sessionData?.data?.session;

  if (!session) {
    return null;
  }
  const profile = await getUser(session.user.user_metadata.username);

  return profile;
};

export default async function CheckoutPage() {
  const profile: Profile | null = await getProfile();
  return <Checkout profile={profile} />;
}

export const dynamic = "force-dynamic";
