import type { UseFormReturnType } from "@mantine/form";

export type FormValues = {
  email: string;
  name: string;
  password: string;
  confirmationCode: string;
  terms: boolean;
};

export type FormProps = {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
};
