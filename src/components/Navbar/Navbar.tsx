"use client";
import { FC, useEffect, useState } from "react";
import {
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./Navbar.styles";
import { HEADER_HEIGHT, appPaths } from "../../../public/config/constants";
import { useSupabase } from "@/app/supabase-provider";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { type User } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

interface NavbarProps {
  links: { link: string; label: string; icon: JSX.Element }[];
}

export const Navbar: FC<NavbarProps> = ({ links }: NavbarProps) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { classes, cx } = useStyles();

  const { supabase } = useSupabase();

  const router = useRouter();

  useEffect(() => {
    const setInitialUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data && data.session && data.session.user) {
        setUser(data.session.user);
      }
      setLoading(false);
    };

    setInitialUser();
  }, [supabase.auth]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session && session.user) {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    // Clean up the listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        setActive(link.link);
        close();
      }}
    >
      <Group spacing={5}>
        {link.icon}
        {link.label}
      </Group>
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Text>Logo</Text>
        <Group spacing={5} className={classes.links}>
          {items}

          {!loading && user ? (
            <Link
              href="#"
              className={cx(classes.link, {
                [classes.linkActive]: active === "#",
              })}
              onClick={async () => {
                setActive("#");
                close();
                const { error } = await supabase.auth.signOut();
                if (error) {
                  console.log(error);
                } else {
                  setActive(appPaths.home);
                  router.push(appPaths.home);
                }
              }}
            >
              <Group spacing={5}>
                <IconLogout />
                SignOut
              </Group>
            </Link>
          ) : (
            <Link
              href={appPaths.signIn}
              className={cx(classes.link, {
                [classes.linkActive]: active === appPaths.signIn,
              })}
              onClick={() => {
                setActive(appPaths.signIn);
                close();
              }}
            >
              <Group spacing={3}>
                <IconLogin />
                Sign In
              </Group>
            </Link>
          )}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export default Navbar;
