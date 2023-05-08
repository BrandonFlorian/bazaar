import { Database } from "@/types/supabase";
import {
  type SupabaseClient,
  createMiddlewareSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res: NextResponse = NextResponse.next();
  const supabase: SupabaseClient = createMiddlewareSupabaseClient<Database>({
    req,
    res,
  });
  await supabase.auth.getSession();
  return res;
}
