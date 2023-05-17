import type { UseFormReturnType } from "@mantine/form";

export type FormValues = {
  email: string;
  username: string;
  password: string;
  terms: boolean;
};

export type FormProps = {
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
};
