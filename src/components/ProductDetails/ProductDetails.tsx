"use client";

import {
  Container,
  Text,
  Group,
  Button,
  Grid,
  Card,
  Center,
  NumberInputHandlers,
  ActionIcon,
  NumberInput,
  rem,
} from "@mantine/core";
import { type Product } from "@prisma/client";
import Image from "next/image";
import React, { type FC, useRef, useState } from "react";
import { IMAGE_BUCKET } from "../../../public/config/constants";
import { useStyles } from "./ProductDetails.styles";
import { formatPrice } from "@/utils/currencyUtils";
import AddToCartModal from "../AddToCartModal/AddToCartModal";

type Props = {
  product: Product | null;
};

export const ProductDetails: FC<Props> = (props: Props) => {
  const { product } = props;
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const handlers = useRef<NumberInputHandlers>({
    decrement: () => {},
    increment: () => {},
  });

  return (
    <Container size="lg">
      <Grid justify="center" align="center">
        <Grid.Col xl={6} lg={6} md={12} sm={12} xs={12}>
          {product?.imageUrl && (
            <Center>
              <Image
                className={classes.productImage}
                src={IMAGE_BUCKET + "/" + product?.imageUrl}
                alt={product?.imageUrl}
                width={250}
                height={250}
              />
            </Center>
          )}
        </Grid.Col>
        <Grid.Col xl={6} lg={6} md={12} sm={12} xs={12}>
          <Center>
            <Card radius="sm" p={50} className={classes.card}>
              <Card.Section m={10}>
                <Text fw={700} fz="xl" align="center">
                  {product?.name}
                </Text>
              </Card.Section>
              <Card.Section withBorder m={10}>
                <Text>{product?.description}</Text>
              </Card.Section>
              <Card.Section m={10}>
                <Group position="apart" mt={10}>
                  <Text>Category:</Text>
                  <Text>{product?.category}</Text>
                </Group>
                <Group position="apart" mt={10}>
                  <Text>Price:</Text>
                  <Text>{formatPrice(product?.price || 0)} each</Text>
                </Group>
                <Group position="apart" mt={10}>
                  <Text>Quantity:</Text>
                  <Group>
                    <ActionIcon
                      size={42}
                      variant="default"
                      onClick={() => handlers.current.decrement()}
                    >
                      –
                    </ActionIcon>

                    <NumberInput
                      hideControls
                      value={quantity}
                      onChange={(val: number) => setQuantity(val)}
                      handlersRef={handlers}
                      max={product?.stock || 0}
                      min={0}
                      step={1}
                      styles={{
                        input: { width: rem(54), textAlign: "center" },
                      }}
                    />

                    <ActionIcon
                      size={42}
                      variant="default"
                      onClick={() => handlers.current.increment()}
                    >
                      +
                    </ActionIcon>
                  </Group>
                </Group>
                <Button
                  fullWidth
                  variant="light"
                  mt={10}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Add to Cart
                </Button>
              </Card.Section>
            </Card>
          </Center>
        </Grid.Col>
      </Grid>
      <AddToCartModal
        product={product}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </Container>
  );
};

export default ProductDetails;
