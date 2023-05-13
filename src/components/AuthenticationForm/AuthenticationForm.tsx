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
import { Stack, Container } from "@mantine/core";
import { type FC, useState } from "react";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";

export const AuthenticationForm: FC = () => {
  const [type, setType] = useState<"login" | "register" | "confirm">("login");
  return (
    <Container size="xs">
      <Stack>
        {type === "login" && <SignInForm type={type} setType={setType} />}
        {type === "register" && <SignUpForm type={type} setType={setType} />}
      </Stack>
    </Container>
  );
};

export default AuthenticationForm;
