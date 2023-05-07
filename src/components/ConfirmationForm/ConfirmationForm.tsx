/**
  @file ConfirmationForm React Component
  This component is responsible for rendering the confirmation form in Open-Market's
  authentication process. It includes input fields for user email and confirmation code.
  @component
  @param {FormProps} props - The props for the ConfirmationForm component.
  @returns {JSX.Element} - The ConfirmationForm component
  @dependencies
      @mantine/core
      react
      ../types
  @example
  import ConfirmationForm from './ConfirmationForm';
  import { useForm } from "@mantine/form";
  import type { FormValues } from "../types";
  const form = useForm<FormValues>({...});
  <ConfirmationForm form={form} />
*/
"use client";
import { TextInput } from "@mantine/core";
import React, { type FC } from "react";
import { FormProps } from "./ConfirmationForm.types";

export const ConfirmationForm: FC<FormProps> = (props: FormProps) => {
  const { form } = props;
  return (
    <React.Fragment>
      <TextInput
        label="Email"
        placeholder="email@clancyworld.com"
        value={form.values.email}
        onChange={(event) =>
          form.setFieldValue("email", event.currentTarget.value)
        }
        error={form.errors.email && "Invalid email"}
        radius="md"
      />
      <TextInput
        label="Confirmation Code"
        placeholder="Enter your confirmation code"
        value={form.values.confirmationCode}
        onChange={(event) =>
          form.setFieldValue("confirmationCode", event.currentTarget.value)
        }
        radius="md"
      />
    </React.Fragment>
  );
};

export default ConfirmationForm;
