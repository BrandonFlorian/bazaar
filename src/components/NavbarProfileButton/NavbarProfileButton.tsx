"use client";

import { useSupabase } from "@/app/supabase-provider";
import { Avatar, Group, Menu, Text } from "@mantine/core";
import { type Session } from "@supabase/auth-helpers-nextjs";
import { appPaths } from "../../../public/config/constants";
import { useRouter } from "next/navigation";
import { IconLogout, IconUserCog } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { useStyles } from "./NavbarProfileButton.styles";
import React, { FC } from "react";
import Link from "next/link";
type Props = {
  session: Session | null | undefined;
};

export const NavbarProfileButton: FC<Props> = (props: Props) => {
  const { session } = props;
  const { supabase } = useSupabase();
  const router = useRouter();
  const { classes } = useStyles();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    } else {
      showNotification({
        title: "Logged out",
        message: "You have been logged out",
        color: "red",
      });
      router.push(appPaths.home);
    }
  };

  return (
    <Menu trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
      <Menu.Target>
        <Avatar />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          <Link
            className={classes.link}
            href={`${appPaths.profile}/${session?.user?.user_metadata?.username}`}
          >
            <Group>
              <IconUserCog />
              <Text>Profile</Text>
            </Group>
          </Link>
        </Menu.Item>
        <Menu.Item
          onClick={async () => {
            await signOut();
          }}
        >
          <Group>
            <IconLogout />
            <Text>Logout</Text>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavbarProfileButton;
