"use client";
import React, { type FC } from "react";
import { Card, Text, Group, Button, Badge } from "@mantine/core";
import { Product } from "@prisma/client";
import { useStyles } from "./styles";
import { formatPrice } from "@/utils/currencyUtils";
import Image from "next/image";
import { IMAGE_BUCKET, appPaths } from "../../../public/config/constants";
import { useRouter } from "next/navigation";
type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = (props: Props) => {
  const { product } = props;
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        {product.imageUrl && (
          <Image
            src={`${IMAGE_BUCKET}/${product.imageUrl}`}
            alt={product.imageUrl}
            width={150}
            height={150}
            className={classes.image}
          />
        )}
      </Card.Section>

      <Group position="apart" mt="md" noWrap>
        <div>
          <Text className={classes.title} lineClamp={1}>
            {product.name}
          </Text>
        </div>
        <Badge variant="outline">25% off</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text className={classes.description} lineClamp={2}>
          {product.description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30} className={classes.priceGroup}>
          <Text className={classes.price}>{formatPrice(product.price)}</Text>

          <Button
            variant="light"
            className={classes.button}
            onClick={() => {
              router.push(`${appPaths.products}/${product.id}`);
            }}
          >
            Buy now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};
