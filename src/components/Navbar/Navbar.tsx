"use client";
import { FC, useState } from "react";
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
import { IconBuildingStore, IconHome, IconLogin } from "@tabler/icons-react";
import { type Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import NavbarProfileButton from "../NavbarProfileButton/NavbarProfileButton";

interface NavbarProps {
  session: Session | null | undefined;
}

export const Navbar: FC<NavbarProps> = (props: NavbarProps) => {
  const { session } = props;

  const links = [
    {
      link: appPaths.home,
      label: "Home",
      icon: <IconHome />,
    },
    {
      link: appPaths.products,
      label: "Products",
      icon: <IconBuildingStore />,
    },
  ];
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const [loading, setLoading] = useState(true);

  const { classes, cx } = useStyles();

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

          {session && session.user.role === "authenticated" ? (
            <NavbarProfileButton session={session} />
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
