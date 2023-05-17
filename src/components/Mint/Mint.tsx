"use client";

import { Container, Button, Text, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { FC, FormEvent, useState } from "react";

type Props = {};

interface FormValues {
  amount: number;
  contractAddress: string;
  totalSupply: number;
}

export const Mint: FC<Props> = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    initialValues: {
      contractAddress: "",
      totalSupply: 0,
      amount: 0,
    },

    validate: {
      contractAddress: (val) =>
        val.length <= 3
          ? "Contract Address should include at least 3 characters"
          : null,
      totalSupply: (val) =>
        val >= 0 ? "Total Supply should be greater than 0" : null,

      amount: (val) => (val >= 0 ? "Amount should be greater than 0" : null),
    },
  });
  const handleSubmit = async (formValues: FormValues) => {};

  return (
    <Container size="xs">
      <Text size="lg" weight={500}>
        Mint
      </Text>
      <Paper shadow="md" withBorder p={10}>
        <form
          onSubmit={(e: FormEvent<HTMLElement>) => {
            e.preventDefault();
            setLoading(true);
            form.onSubmit(async () => {
              await handleSubmit(form.values);
            })();
            setLoading(false);
          }}
        >
          <TextInput
            required
            label="Contract Address"
            placeholder="Contract Address"
            variant="filled"
            size="sm"
          />
          <TextInput
            required
            label="Total Supply"
            placeholder="Total Supply"
            variant="filled"
            size="sm"
          />
          <TextInput
            required
            label="Amount"
            placeholder="Amount"
            variant="filled"
            size="sm"
          />
          <Button
            type="submit"
            loading={loading}
            variant="light"
            fullWidth
            mt={10}
          >
            Mint
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Mint;
