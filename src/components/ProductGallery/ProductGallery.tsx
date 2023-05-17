"use client";

import { type Product } from "@prisma/client";
import React, { useState, type FC } from "react";
import { Center, Grid } from "@mantine/core";
import { ProductCard } from "../ProductCard/ProductCard";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { SearchBar } from "../SearchBar/SearchBar";
import { useProducts } from "@/hooks/useProducts";
import {
  GALLERY_PAGE_SIZE,
  PRODUCTS_ENDPOINT,
} from "../../../public/config/constants";
type Props = {
  products: Product[];
};

export const ProductGallery: FC<Props> = (props: Props) => {
  const { products } = props;
  const [searchText, setSearchText] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [orderFilter, setOrderFilter] = useState<"price" | "createdAt">(
    "createdAt"
  );
  const [sortFilter, setSortFilter] = useState<"asc" | "desc">("desc");

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
    setSize: productsSetSize,
    size: productsSize,
  } = useProducts(
    true,
    PRODUCTS_ENDPOINT,
    {
      limit: GALLERY_PAGE_SIZE,
      order: orderFilter,
      sort: sortFilter,
      query: searchText,
      //lang: currentLanguage,
    },
    [products]
  );

  return (
    <React.Fragment>
      <SearchBar
        filtersLabel="Filters"
        inputValue={searchText}
        setInputValue={setSearchText}
        selectValue={priceFilter}
        setSelectValue={setPriceFilter}
        orderValue={orderFilter}
        setOrderValue={setOrderFilter}
        sortValue={sortFilter}
        setSortValue={setSortFilter}
        showSearchInput={true}
        showSortSelect={true}
      />
      <Grid align="center" justify="center">
        {productsData.map((product: Product, index) => (
          <Grid.Col key={product.id} xl={3} lg={3} md={4} sm={6} xs={12}>
            <Center>
              <motion.div
                initial="hidden"
                whileInView={"show"}
                variants={fadeIn("left", "tween", 1, index / 2)}
              >
                <ProductCard product={product} />
              </motion.div>
            </Center>
          </Grid.Col>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default ProductGallery;
