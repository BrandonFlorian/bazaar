/**
  @file SignUpForm React Component
  This component is responsible for rendering the registration form in Open-Market's
  authentication process. It includes input fields for user name, email, and password,
  as well as a checkbox for accepting terms and conditions.
  @component
  @param {FormProps} props - The props for the SignUpForm component.
  @returns {JSX.Element} - The SignUpForm component
  @dependencies
      @mantine/core
      react
      ../types
  @example
  import SignUpForm from './SignUpForm';
  import { useForm } from "@mantine/form";
  import type { FormValues } from "../types";
  const form = useForm<FormValues>({...});
  <SignUpForm form={form} />
*/
"use client";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Container,
  Paper,
  Text,
  Button,
  Anchor,
  Stack,
} from "@mantine/core";
import React, { useState, type FC, FormEvent } from "react";
import { FormProps, FormValues } from "./SignUpForm.types";
import { useSupabase } from "@/app/supabase-provider";
import { useForm } from "@mantine/form";
import ConfirmationForm from "../ConfirmationForm/ConfirmationForm";
import { USERNAME_ENDPOINT } from "../../../public/config/constants";

export const SignUpForm: FC<FormProps> = (props: FormProps) => {
  const { type, setType, ...rest } = props;
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const { supabase } = useSupabase();

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      username: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,

      username: (val) =>
        val.length <= 3
          ? "Username should include at least 3 characters"
          : null,
    },
  });

  const checkUsernameAndEmail = async (username: string, email: string) => {
    try {
      const response: boolean = await fetch(USERNAME_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }),
      }).then((res) => res.json());
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = async (values: FormValues) => {
    try {
      setLoading(true);
      const isTaken = await checkUsernameAndEmail(
        values.username,
        values.email
      );
      console.log(isTaken);
      if (isTaken) {
        setErrorMessage("Username or email already exists");
        setLoading(false);
        return;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              username: values.username,
            },
          },
        });
        if (error) setErrorMessage(error.message);
        if (data?.user?.role === "authenticated") {
          setLoading(false);
          setShowConfirmation(true);
        }
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error);
    }
  };

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder {...rest}>
        {!showConfirmation ? (
          <>
            <Text size="lg" weight={500}>
              Welcome to Open-Market, Register
            </Text>
            <form
              onSubmit={(e: FormEvent<HTMLElement>) => {
                e.preventDefault();
                form.onSubmit(async () => {
                  await handleRegister(form.values);
                })();
              }}
            >
              <TextInput
                label="User Name"
                placeholder="User Name"
                value={form.values.username}
                onChange={(event) =>
                  form.setFieldValue("username", event.currentTarget.value)
                }
                radius="md"
              />
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
                    setType("login");
                  }}
                  size="xs"
                >
                  Already have an account? Login
                </Anchor>
              </Stack>
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
              <Button
                mt={20}
                type="submit"
                radius="xl"
                loading={loading}
                fullWidth
              >
                REGISTER
              </Button>
            </form>
          </>
        ) : (
          <ConfirmationForm email={form.values.email} />
        )}
      </Paper>
    </Container>
  );
};

export default SignUpForm;
