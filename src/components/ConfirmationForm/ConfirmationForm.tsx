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
import { Text } from "@mantine/core";
import React, { type FC } from "react";
import { FormProps } from "./ConfirmationForm.types";

export const ConfirmationForm: FC<FormProps> = (props: FormProps) => {
  const { email } = props;
  return (
    <React.Fragment>
      <Text size="lg" weight={500} align="center">
        Confirm your email
      </Text>
      <Text>
        Please check your email for a confirmation link! We sent one to {email}
      </Text>
    </React.Fragment>
  );
};

export default ConfirmationForm;
