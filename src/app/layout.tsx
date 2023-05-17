import RootStyleRegistry from "./providers";

export const metadata = {
  title: "Elysian Emporium",
  description:
    "A mystical marketplace where exotic treasures, enchanted artifacts, and magical wares from realms beyond converge, catering to heroes and adventurers seeking the extraordinary",
};
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
const getServerSideSession = async () => {
  try {
    const supabase = createServerComponentSupabaseClient({
      headers,
      cookies,
    });

    const sessionData = await supabase.auth.getSession();
    return sessionData?.data?.session;
  } catch (error) {
    console.log(error);
  }
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSideSession();

  return (
    <html lang="en">
      <body>
        <RootStyleRegistry session={session}>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
export const dynamic = "force-dynamic";
