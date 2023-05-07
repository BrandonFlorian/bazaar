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
import { TextInput, PasswordInput } from "@mantine/core";
import React, { type FC } from "react";
import { FormProps } from "./SignInForm.types";

export const SignInForm: FC<FormProps> = (props: FormProps) => {
  const { form } = props;
  return (
    <React.Fragment>
      <TextInput
        required
        label="Email"
        placeholder="email@clancyworld.com"
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
    </React.Fragment>
  );
};

export default SignInForm;
