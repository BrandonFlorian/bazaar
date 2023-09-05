import {
  Session,
  createServerComponentSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { supabase } from "./supabaseClient";

export async function authorizeUser(request: NextRequest) {
  // Extract the authorization header
  const token = request.headers.get("Authorization");
  if (!token) {
    return null;
  }
  // Validate the token and get the user
  const { data: user, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return null;
  }

  return user;
}

export const getServerSideSession = async (): Promise<Session | null> => {
  try {
    const supabase = createServerComponentSupabaseClient({
      headers,
      cookies,
    });
    const sessionData = await supabase.auth.getSession();
    const session: Session | null = sessionData?.data?.session;

    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
};
