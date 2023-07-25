"use client";
import { Profile } from "@prisma/client";
import React, { FC, useEffect, useState } from "react";
import { Navbar, SegmentedControl, Text } from "@mantine/core";
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconReceipt2,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import Link from "next/link";
import { appPaths } from "../../../public/config/constants";
import ProfileForm from "../ProfileForm/ProfileForm";
import { useStyles } from "./UserProfile.styles";
import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";
import { OrderWithItemsAndProducts } from "@/types/dataTypes";
import PreviousOrders from "../PreviousOrders";

const tabs = {
  account: [
    { link: "", label: "Account", icon: IconKey },
    { link: "", label: "Notifications", icon: IconBellRinging },
    { link: "", label: "Billing", icon: IconReceipt2 },
    { link: "", label: "Security", icon: IconFingerprint },
    { link: "", label: "Authentication", icon: Icon2fa },
    { link: "", label: "Other Settings", icon: IconSettings },
  ],
  general: [
    { link: "", label: "Orders", icon: IconShoppingCart },
    { link: "", label: "Receipts", icon: IconLicense },
    { link: "", label: "Reviews", icon: IconMessage2 },
    { link: "", label: "Messages", icon: IconMessages },
    { link: "", label: "Customers", icon: IconUsers },
    { link: "", label: "Refunds", icon: IconReceiptRefund },
    { link: "", label: "Files", icon: IconFileAnalytics },
  ],
};
type Props = {
  user: Profile | null;
  orders: OrderWithItemsAndProducts[] | null;
};

export const UserProfile: FC<Props> = (props: Props) => {
  const { user, orders } = props;
  const { classes, cx } = useStyles();
  const { supabase } = useSupabase();
  const router = useRouter();
  const [section, setSection] = useState<"account" | "general">("account");
  const [active, setActive] = useState<string>("Account");
  const [currentComponent, setCurrentComponent] = useState<JSX.Element>(<></>);

  const links = tabs[section].map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  useEffect(() => {
    const getCurrentTab = () => {
      switch (active) {
        case "Account":
          return <ProfileForm user={user} />;
        case "Notifications":
          return <></>;
        case "Billing":
          return <></>;
        case "Security":
          return <></>;
        case "Authentication":
          return <></>;
        case "Other Settings":
          return <></>;
        case "Orders":
          return <PreviousOrders orders={orders} />;
        default:
          return <></>;
      }
    };
    setCurrentComponent(getCurrentTab());
  }, [active, orders, user]);

  return (
    <React.Fragment>
      {currentComponent}

      <Navbar
        height={840}
        width={{ sm: 300 }}
        p="md"
        className={classes.navbar}
      >
        <Navbar.Section>
          <Text
            weight={500}
            size="sm"
            className={classes.title}
            color="dimmed"
            mb="xs"
          >
            {user?.email}
          </Text>

          <SegmentedControl
            value={section}
            onChange={(value: "account" | "general") => setSection(value)}
            transitionTimingFunction="ease"
            fullWidth
            data={[
              { label: "Account", value: "account" },
              { label: "System", value: "general" },
            ]}
          />
        </Navbar.Section>

        <Navbar.Section grow mt="xl">
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <Link className={classes.link} href={appPaths.signIn}>
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </Link>

          <Link
            href="#"
            className={classes.link}
            onClick={async (event) => {
              event.preventDefault();
              const { error } = await supabase.auth.signOut();
              if (error) console.log(error);
              else {
                router.push(appPaths.home);
              }
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Link>
        </Navbar.Section>
      </Navbar>
    </React.Fragment>
  );
};

export default UserProfile;
