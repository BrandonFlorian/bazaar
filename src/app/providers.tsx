"use client";

import { CacheProvider } from "@emotion/react";
import {
  useEmotionCache,
  MantineProvider,
  type MantineThemeOverride,
  AppShell,
} from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { Session } from "@supabase/supabase-js";
import lightTheme from "../themes/lightTheme";
import darkTheme from "../themes/darkTheme";
import SupabaseProvider from "./supabase-provider";
import Navbar from "@/components/Navbar";
import { Notifications } from "@mantine/notifications";
import { CartProvider } from "@/context/cartContext";
import Footer from "@/components/Footer/Footer";
import { FOOTER_LINKS } from "../../public/config/constants";
export default function RootStyleRegistry({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null | undefined;
}) {
  const cache = useEmotionCache();
  cache.compat = true;
  const [theme, setTheme] = useLocalStorage<MantineThemeOverride>({
    key: "mantine-color-scheme",
    defaultValue: darkTheme,
    getInitialValueInEffect: true,
  });

  const toggleTheme = (value?: MantineThemeOverride) =>
    setTheme(value || (theme === lightTheme ? darkTheme : lightTheme));

  useHotkeys([["mod+J", () => toggleTheme()]]);

  //currently theme switching is not working due to new changes in NextJS. We can theme toggle if we comment out this function, however we get bad layout shifting during load.
  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <SupabaseProvider>
      <CacheProvider value={cache}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={theme}
          key={theme.colorScheme}
        >
          <CartProvider>
            <Notifications />
            <AppShell
              header={<Navbar session={session} />}
              footer={
                <Footer
                  data={FOOTER_LINKS}
                  copyright="© 2023 SOG. All rights reserved."
                  //logo={"Logo"}
                />
              }
            >
              {children}
            </AppShell>
          </CartProvider>
        </MantineProvider>
      </CacheProvider>
    </SupabaseProvider>
  );
}
