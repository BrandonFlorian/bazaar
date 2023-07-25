import React, { FC, useEffect, useState } from "react";
import { Container, Text, Stack } from "@mantine/core";
import { OrderItem } from "@prisma/client";
import { formatPrice } from "@/utils/currencyUtils";
import { OrderWithItemsAndProducts } from "@/types/dataTypes";
type Props = {
  order: OrderWithItemsAndProducts | undefined;
};

export const Order: FC<Props> = (props: Props) => {
  const { order } = props;
  console.log("order: ", order);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (order !== undefined) {
      let total = 0;
      order.orderItems.forEach((item) => {
        total += Number(item.price) * item.quantity;
      });
      setTotal(total);
    }
  }, [order]);

  return (
    <Container>
      <Text>Order Details</Text>
      {order === undefined ? (
        <Text>Order Not Found</Text>
      ) : (
        <React.Fragment>
          <Stack align="center">
            <Text>Order ID: {order.id}</Text>
            <Text>Order Status: {order.orderStatus}</Text>
            {order.orderItems.map((item: OrderItem) => (
              <React.Fragment key={item.id}>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Price: {formatPrice(Number(item.price))}</Text>
                <Text>Product: {item.productId}</Text>
              </React.Fragment>
            ))}
            <Text>Total: {formatPrice(total)}</Text>
          </Stack>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Order;
