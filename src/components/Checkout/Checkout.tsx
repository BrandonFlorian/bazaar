"use client";
import { FC, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  Container,
  Text,
  ActionIcon,
  Grid,
} from "@mantine/core";
import { useCart } from "@/context/cartContext";
import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { IMAGE_BUCKET } from "../../../public/config/constants";
import React from "react";
import { useStyles } from "./Checkout.styles";
import { CheckoutForm } from "../CheckoutForm";

import { type Profile } from "@prisma/client";
import Order from "../Order/Order";
import { useOrder } from "@/hooks/useOrder";

type Props = {
  profile: Profile | null;
};
export const Checkout: FC<Props> = (props: Props) => {
  const { profile } = props;

  const [active, setActive] = useState(0);
  const [orderId, setOrderId] = useState<string | undefined>();
  const { items, removeItem } = useCart();
  const { classes } = useStyles();

  const { data, mutate } = useOrder(true, "/api/order", orderId);
  console.log("data: ", data);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <Container>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="xs"
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="First step" description="Verify Cart">
          <Container mt="xl">
            <Grid align="center" justify="center" columns={15}>
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <Grid.Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Text>{item.name}</Text>
                  </Grid.Col>
                  <Grid.Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Image
                      className={classes.image}
                      src={`${IMAGE_BUCKET}/${item.image}`}
                      alt="product image"
                      width={100}
                      height={100}
                    />
                  </Grid.Col>
                  <Grid.Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Text>{item.price}</Text>
                  </Grid.Col>
                  <Grid.Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Text>{item.quantity}</Text>
                  </Grid.Col>
                  <Grid.Col xs={3} sm={3} md={3} lg={3} xl={3}>
                    <ActionIcon
                      variant="light"
                      color="red"
                      size={42}
                      onClick={() => {
                        removeItem(item.id);
                      }}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Grid.Col>
                </React.Fragment>
              ))}
            </Grid>
          </Container>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify Payment">
          <CheckoutForm
            profile={profile}
            nextStep={nextStep}
            setOrderId={setOrderId}
            mutate={mutate}
          />
        </Stepper.Step>
        <Stepper.Completed>
          <Order order={data} />
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </Container>
  );
};
export default Checkout;
