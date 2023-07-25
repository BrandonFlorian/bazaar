import React, { type FC } from "react";
import { Container, Text } from "@mantine/core";
import { OrderWithItemsAndProducts } from "@/types/dataTypes";
import OrderCard from "../OrderCard/OrderCard";
import { useStyles } from "./PreviousOrders.styles";
type Props = {
  orders: OrderWithItemsAndProducts[] | null;
};

export const PreviousOrders: FC<Props> = (props: Props) => {
  const { classes } = useStyles();
  return (
    <Container>
      <Text align="center">Previous Orders</Text>

      {props.orders?.map((order) => (
        <div key={order.id} className={classes.orderContainer}>
          <OrderCard order={order} />
        </div>
      ))}
    </Container>
  );
};

export default PreviousOrders;
