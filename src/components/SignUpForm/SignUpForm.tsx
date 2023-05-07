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
import { TextInput, PasswordInput, Checkbox } from "@mantine/core";
import React, { type FC } from "react";
import { FormProps } from "./SignUpForm.types";

export const SignUpForm: FC<FormProps> = (props: FormProps) => {
  const { form } = props;
  return (
    <React.Fragment>
      <TextInput
        label="Name"
        placeholder="Your name"
        value={form.values.name}
        onChange={(event) =>
          form.setFieldValue("name", event.currentTarget.value)
        }
        radius="md"
      />
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
      <Checkbox
        label="I accept terms and conditions"
        checked={form.values.terms}
        onChange={(event) =>
          form.setFieldValue("terms", event.currentTarget.checked)
        }
      />
    </React.Fragment>
  );
};

export default SignUpForm;
