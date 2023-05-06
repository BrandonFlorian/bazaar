"use client";

import { type Product } from "@prisma/client";
import React, { type FC } from "react";
import { Center, Grid } from "@mantine/core";
import { ProductCard } from "../ProductCard/ProductCard";
type Props = {
  products: Product[];
};

export const ProductGallery: FC<Props> = (props: Props) => {
  const { products } = props;
  return (
    <Grid align="center" justify="center">
      {products.map((product: Product) => (
        <Grid.Col key={product.id} xl={3} lg={3} md={4} sm={6} xs={12}>
          <Center>
            <ProductCard product={product} />
          </Center>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ProductGallery;
