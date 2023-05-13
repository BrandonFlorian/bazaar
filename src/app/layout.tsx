import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import RootStyleRegistry from "./emotion";
import { cookies, headers } from "next/headers";
export const metadata = {
  title: "Elysian Emporium",
  description:
    "A mystical marketplace where exotic treasures, enchanted artifacts, and magical wares from realms beyond converge, catering to heroes and adventurers seeking the extraordinary",
};

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
