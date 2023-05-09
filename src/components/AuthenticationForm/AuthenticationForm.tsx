/**
  @file AuthenticationForm React Component
  This component is responsible for rendering the authentication form for Open-Market.
  It allows users to log in, register, and confirm their registration using email or
  third-party services like Google and Twitter.
  @component
  @param {PaperProps} props - The props for the AuthenticationForm component.
  @returns {JSX.Element} - The AuthenticationForm component
  @dependencies
      @mantine/hooks
      @mantine/form
      @mantine/core
      react
      ../SocialButtons/SocialButtons
      ./useAuthenticationForm
      ./types
      ./LoginForm
      ./RegistrationForm
      ./ConfirmationForm
  @example
  import AuthenticationForm from './AuthenticationForm';
  <AuthenticationForm />
*/
"use client";
import { upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  Container,
} from "@mantine/core";

import { type FC, FormEvent } from "react";
import { FormValues } from "./AuthenticationForm.types";
import useAuthenticationForm from "./useAuthenticationForm";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import ConfirmationForm from "../ConfirmationForm/ConfirmationForm";

export const AuthenticationForm: FC = (props: PaperProps) => {
  const { handleSubmit, loading, type, setType } = useAuthenticationForm();
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmationCode: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Open-Market, {type} with
        </Text>

        {/* <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group> */}

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          onSubmit={(e: FormEvent<HTMLElement>) => {
            e.preventDefault();
            form.onSubmit(async () => {
              await handleSubmit(form.values, type);
            })();
          }}
        >
          <Stack>
            {type === "login" && <SignInForm form={form} />}
            {type === "register" && <SignUpForm form={form} />}
            {type === "confirm" && <ConfirmationForm form={form} />}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => {
                if (type === "register") {
                  setType("login");
                } else if (type === "login") {
                  setType("register");
                }
              }}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" loading={loading}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthenticationForm;
