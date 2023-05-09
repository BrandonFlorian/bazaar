"use client";

import { type Product } from "@prisma/client";
import React, { type FC } from "react";
import { Center, Grid } from "@mantine/core";
import { ProductCard } from "../ProductCard/ProductCard";
import { useSupabase } from "@/app/supabase-provider";
import { motion } from "framer-motion";
type Props = {
  products: Product[];
};

export const ProductGallery: FC<Props> = (props: Props) => {
  const { products } = props;
  const { supabase } = useSupabase();

  return (
    <Grid align="center" justify="center">
      {products.map((product: Product) => (
        <Grid.Col key={product.id} xl={3} lg={3} md={4} sm={6} xs={12}>
          <Center>
            <motion.div
              className="container"
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          </Center>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ProductGallery;
