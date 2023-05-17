import React, { FC, useState } from "react";
import { Modal, Text, Button, Center, Divider, Group } from "@mantine/core";
import { Product } from "@prisma/client";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import { IMAGE_BUCKET } from "../../../public/config/constants";
import { formatPrice } from "@/utils/currencyUtils";
import { useStyles } from "./AddToCartModal.styles";
type Props = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
};

export const AddToCartModal: FC<Props> = (props: Props) => {
  const { open, onClose, product, quantity } = props;
  const { addItem } = useCart();
  const { classes } = useStyles();
  return (
    <Modal opened={open} onClose={onClose} closeOnClickOutside>
      <Text className={classes.title}>{product?.name}</Text>
      <Divider mt={10} />
      {product?.imageUrl && (
        <Center>
          <Image
            className={classes.image}
            src={`${IMAGE_BUCKET}/${product?.imageUrl}`}
            alt={"product image"}
            width={100}
            height={100}
          />
        </Center>
      )}
      <Text className={classes.textItems}>{product?.description}</Text>

      <Divider mt={10} />
      <Group position="apart">
        <Text className={classes.textItems}>Category: </Text>
        <Text className={classes.textItems}>{product?.category}</Text>
      </Group>
      <Group position="apart">
        <Text className={classes.textItems}>Price: </Text>
        <Text className={classes.textItems}>
          {formatPrice(product?.price || 0)}
        </Text>
      </Group>
      <Group position="apart">
        <Text className={classes.textItems}>In Stock: </Text>
        <Text className={classes.textItems}>{product?.stock}</Text>
      </Group>

      <Button
        mt={10}
        fullWidth
        variant="light"
        onClick={() => {
          if (!product) {
            return;
          }
          console.log("adding item");
          console.log(product, quantity);
          addItem({
            id: product?.id,
            name: product?.name,
            price: product?.price,
            image: product?.imageUrl!,
            quantity: quantity as number,
          });
          onClose();
        }}
      >
        Confirm
      </Button>
    </Modal>
  );
};

export default AddToCartModal;
