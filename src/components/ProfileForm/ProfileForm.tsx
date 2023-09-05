"use client";

import {
  Container,
  Text,
  Group,
  Button,
  TextInput,
  Textarea,
  Avatar,
} from "@mantine/core";
import { DatePickerInput, DateValue } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Profile } from "@prisma/client";
import React, { FormEvent, type FC, useState } from "react";
import { PROFILES_ENDPOINT } from "../../../public/config/constants";
import { notifications } from "@mantine/notifications";
import { useSupabase } from "@/app/supabase-provider";
type Props = { user: Profile | null };
type FormValues = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  bio?: string;
  profileImageUrl?: string;
  dateOfBirth?: Date;
};

export const ProfileForm: FC<Props> = (props: Props) => {
  const { user } = props;
  const { supabase } = useSupabase();
  const form = useForm<FormValues>({
    initialValues: {
      id: user?.id || "",
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      username: user?.username || "",
      bio: user?.bio || "",
      profileImageUrl: user?.profileImageUrl || "",
      dateOfBirth: user?.dateOfBirth || undefined,
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      firstName: (val: string) => (val ? null : "First name is required"),
      lastName: (val: string) => (val ? null : "Last name is required"),
      phoneNumber: (val: string) =>
        /^\d{10}$/.test(val) ? null : "Invalid phone number",
      username: (val: string) => (val ? null : "Username is required"),
    },
  });
  console.log(user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;
      if (!accessToken) throw new Error("No access token found");
      const result = await fetch(
        `${PROFILES_ENDPOINT}?username=${user?.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (result.ok) {
        console.log("success");
        notifications.show({
          title: "Profile updated",
          message: "Your profile has been updated",
          color: "green",
        });
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Profile update failed",
        message: "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs">
      <Text size="lg" weight={500}>
        Profile
      </Text>

      <form
        onSubmit={(e: FormEvent<HTMLElement>) => {
          e.preventDefault();
          form.onSubmit(async () => {
            await handleSubmit(form.values);
          })();
        }}
      >
        <Avatar
          src={form.values.profileImageUrl}
          alt={form.values.firstName}
          radius="xl"
          size="xl"
          style={{ margin: "0 auto" }}
          onClick={() => {
            notifications.show({
              title: "Profile image",
              message: "Profile image is not editable yet",
              color: "blue",
            });
          }}
        />

        <TextInput
          required
          label="First Name"
          placeholder="First Name"
          value={form.values.firstName}
          onChange={(event) =>
            form.setFieldValue("firstName", event.currentTarget.value)
          }
          error={form.errors.firstName && String(form.errors.firstName)}
        />
        <TextInput
          required
          label="Last Name"
          placeholder="Last Name"
          value={form.values.lastName}
          onChange={(event) =>
            form.setFieldValue("lastName", event.currentTarget.value)
          }
          error={form.errors.lastName && String(form.errors.lastName)}
        />
        <TextInput
          required
          label="Email"
          placeholder="Email"
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          error={form.errors.email && String(form.errors.email)}
        />
        <TextInput
          required
          label="Phone"
          placeholder="Phone"
          value={form.values.phoneNumber}
          onChange={(event) =>
            form.setFieldValue("phoneNumber", event.currentTarget.value)
          }
          error={form.errors.phoneNumber && String(form.errors.phoneNumber)}
        />
        <TextInput
          required
          label="User Name"
          placeholder="User Name"
          value={form.values.username}
          onChange={(event) =>
            form.setFieldValue("username", event.currentTarget.value)
          }
          error={form.errors.username && String(form.errors.username)}
        />

        <DatePickerInput
          label="Date of Birth"
          placeholder="Date of Birth"
          value={
            form?.values?.dateOfBirth
              ? new Date(form.values.dateOfBirth)
              : undefined
          }
          onChange={(event) =>
            form.setFieldValue("dateOfBirth", event || undefined)
          }
          error={form.errors.dateOfBirth && String(form.errors.dateOfBirth)}
        />

        <Textarea
          placeholder="Your Profile Header"
          label="Bio"
          description="Enter a header for your public profile"
          value={form.values.bio}
          onChange={(event) =>
            form.setFieldValue("bio", event.currentTarget.value)
          }
          error={form.errors.bio && String(form.errors.bio)}
        />

        <Group position="apart" mt="xl">
          <Button
            type="submit"
            radius="sm"
            loading={loading}
            fullWidth
            variant="light"
          >
            Update Profile
          </Button>
        </Group>
      </form>
    </Container>
  );
};

export default ProfileForm;
