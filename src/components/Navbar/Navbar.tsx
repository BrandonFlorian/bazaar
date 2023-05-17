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
  ActionIcon,
  Indicator,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./Navbar.styles";
import { HEADER_HEIGHT, appPaths } from "../../../public/config/constants";
import {
  IconBuildingStore,
  IconHome,
  IconLogin,
  IconPlant2,
  IconShoppingCart,
} from "@tabler/icons-react";
import { type Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import NavbarProfileButton from "../NavbarProfileButton/NavbarProfileButton";
import React from "react";
import Cart from "../Cart/Cart";
import { useCart } from "@/context/cartContext";

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
    {
      link: appPaths.mint,
      label: "Mint",
      icon: <IconPlant2 />,
    },
  ];
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const { classes, cx } = useStyles();
  const { items: cartItems } = useCart();

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
        <Group spacing={5} className={classes.links} noWrap>
          {items}

          {session && session.user.role === "authenticated" ? (
            <React.Fragment>
              <Group position="apart" noWrap>
                <NavbarProfileButton session={session} />

                <Indicator
                  label={cartItems.length.toString()}
                  size={16}
                  color="blue"
                  disabled={cartItems.length === 0}
                >
                  <ActionIcon color="gray" onClick={() => setOpen(!open)}>
                    <IconShoppingCart />
                  </ActionIcon>
                </Indicator>
              </Group>
              <Cart
                title="Cart"
                position="right"
                open={open}
                setOpen={setOpen}
                buttonText="Checkout"
              />
            </React.Fragment>
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
              <Group spacing={3} noWrap>
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
