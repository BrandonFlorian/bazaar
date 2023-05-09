/**
  @file ConfirmationForm React Component
  This component is responsible for rendering the confirmation form in Open-Market's
  authentication process. 
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
import { TextInput, Text } from "@mantine/core";
import React, { type FC } from "react";
import { FormProps } from "./ConfirmationForm.types";

export const ConfirmationForm: FC<FormProps> = (props: FormProps) => {
  const { form } = props;
  return (
    <React.Fragment>
      <Text>
        Please check your email for a confirmation link! We sent one to{" "}
        {form.values.email}
      </Text>
    </React.Fragment>
  );
};

export default ConfirmationForm;
