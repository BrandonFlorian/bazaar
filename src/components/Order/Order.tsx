import React, { FC, useEffect, useState } from "react";
import { Container, Text, Stack } from "@mantine/core";
import { OrderItem } from "@prisma/client";
import { OrderResponse } from "@/types/circle";
import { formatPrice } from "@/utils/currencyUtils";
type Props = {
  order: OrderResponse | undefined;
};

export const Order: FC<Props> = (props: Props) => {
  const { order } = props;
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (order !== undefined) {
      let total = 0;
      order.order_items.forEach((item) => {
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
            <Text>Order Status: {order.order_status}</Text>
            {order.order_items.map((item: OrderItem) => (
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
