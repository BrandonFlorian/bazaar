/**
  @file SignInForm React Component
  This component is responsible for rendering the login form in Open-Market's
  authentication process. It includes input fields for user email and password.
  @component
  @param {FormProps} props - The props for the SignInForm component.
  @returns {JSX.Element} - The SignInForm component
  @dependencies
      @mantine/core
      react
      ../types
  @example
  import SignInForm from './SignInForm';
  import { useForm } from "@mantine/form";
  import type { FormValues } from "../types";
  const form = useForm<FormValues>({...});
  <SignInForm form={form} />
*/
"use client";
import {
  TextInput,
  PasswordInput,
  Container,
  Paper,
  Text,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import React, { useState, type FC, FormEvent } from "react";
import { FormProps, FormValues } from "./SignInForm.types";
import { useSupabase } from "@/app/supabase-provider";
import { appPaths } from "../../../public/config/constants";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

export const SignInForm: FC<FormProps> = (props: FormProps) => {
  const { type, setType, ...rest } = props;
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleLogin = async (values: FormValues) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) setErrorMessage(error.message);
      else {
        setLoading(false);
        showNotification({
          title: "Welcome back ❤️",
          message: `You have successfully logged in.`,
          color: "teal",
        });
        return router.push(appPaths.home);
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error);
    }
  };

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder {...rest}>
        <Text size="lg" weight={500}>
          Welcome to Open-Market, Sign in
        </Text>
        <Divider label="Continue with email" labelPosition="center" my="lg" />
        <form
          onSubmit={(e: FormEvent<HTMLElement>) => {
            e.preventDefault();
            form.onSubmit(async () => {
              await handleLogin(form.values);
            })();
          }}
        >
          <TextInput
            required
            label="Email"
            placeholder="email@example.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
          <Stack>
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => {
                setType("register");
              }}
              size="xs"
            >
              {`Don't have an account? Register`}
            </Anchor>
            <Button type="submit" radius="xl" loading={loading} fullWidth>
              LOGIN
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default SignInForm;
