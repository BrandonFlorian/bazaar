import React, { FC } from "react";
import {
  Text,
  Drawer,
  Button,
  Divider,
  Grid,
  Title,
  Card,
  Stack,
  Group,
} from "@mantine/core";

import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import { useStyles } from "./Cart.styles";
import { CartProps } from "./Cart.types";
import { IMAGE_BUCKET, appPaths } from "../../../public/config/constants";
import Image from "next/image";
import { formatPrice } from "@/utils/currencyUtils";

export const Cart: FC<CartProps> = (props: CartProps) => {
  const { title, open, setOpen, position, buttonText } = props;
  const { items, total, removeItem } = useCart();

  const router = useRouter();
  const { classes } = useStyles();

  return (
    <Drawer
      opened={open}
      onClose={() => {
        setOpen(false);
      }}
      position={position}
      size="md"
    >
      <Title align="center">{title}</Title>
      <Divider />
      <Text m={20} weight={700}>
        {items.length} items
      </Text>
      <Grid ml={5} align="center" justify="center">
        {items?.map((item) => (
          <div key={item.id}>
            <Group noWrap position="apart">
              <Card className={classes.imageCard}>
                {item.image && (
                  <Image
                    src={`${IMAGE_BUCKET}/${item.image}`}
                    width={100}
                    height={100}
                    alt="cart-item"
                  />
                )}
              </Card>
              <Text key={item?.id} align="center">
                {item?.name}
              </Text>

              <Button
                mt={10}
                onClick={() => {
                  removeItem(item?.id);
                  setOpen(false);
                }}
              >
                <IconTrash />
              </Button>
            </Group>
            <Group position="apart" mt={10} noWrap>
              <Text align="center">{formatPrice(item?.price || 0)}</Text>
              <Text align="center">Quantity: {item?.quantity}</Text>
            </Group>
          </div>
        ))}
      </Grid>
      <Divider mt={20} />

      {items.length > 0 && (
        <Stack mt={20} spacing={10}>
          <Text align="center">Total: {formatPrice(total || 0)}</Text>
          <Button
            className={classes.checkoutButton}
            fullWidth
            variant="filled"
            onClick={() => {
              router.push(appPaths.checkout);
              setOpen(false);
            }}
          >
            {buttonText}
          </Button>
        </Stack>
      )}
    </Drawer>
  );
};

export default Cart;
