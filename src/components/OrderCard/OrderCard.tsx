import React, { type FC } from "react";
import { Card, Container, Group, Stack, Text } from "@mantine/core";
import { OrderWithItemsAndProducts } from "@/types/dataTypes";
import Image from "next/image";
import { IMAGE_BUCKET } from "../../../public/config/constants";
import { useStyles } from "./OrderCard.styles";
import {
  IconCircleCheckFilled,
  IconSquareRoundedXFilled,
  IconClockFilled,
} from "@tabler/icons-react";
import { formatPrice } from "@/utils/currencyUtils";
type Props = {
  order: OrderWithItemsAndProducts;
};

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "confirmed":
      return (
        <IconCircleCheckFilled
          color="green"
          style={{
            color: "green",
          }}
        />
      ); // adjust the icon and color as per your design
    case "paid":
      return (
        <IconCircleCheckFilled
          color="green"
          style={{
            color: "green",
          }}
        />
      );
    case "pending":
      return (
        <IconClockFilled
          color="yellow"
          style={{
            color: "yellow",
          }}
        />
      );
    case "failed":
      return (
        <IconSquareRoundedXFilled
          color="red"
          style={{
            color: "red",
          }}
        />
      );
    default:
      return null;
  }
};

export const OrderCard: FC<Props> = (props: Props) => {
  const { order } = props;
  const { classes } = useStyles();
  return (
    <Container key={order.id} size="sm">
      <Card withBorder radius={"md"}>
        <Stack>
          <Group position="apart">
            <Text>Order ID:</Text>
            <Text>{order.id}</Text>
          </Group>
          <Group position="apart">
            <Text>Status:</Text>
            <Group>
              <Text tt="uppercase">{order.orderStatus}</Text>
              <StatusIcon status={order.orderStatus} />
            </Group>
          </Group>
          <Group position="apart">
            <Text>Date:</Text>
            <Text>{new Date(order.createdAt).toDateString()}</Text>
          </Group>
        </Stack>
        {order.orderItems.map((item) => (
          <div key={item.id}>
            <Card withBorder mt={20}>
              <Group position="apart">
                <Stack>
                  <Group position="apart">
                    <Text>Item:</Text>
                    <Text>{item.product?.name}</Text>
                  </Group>
                  <Group position="apart">
                    <Text>Quantity:</Text>
                    <Text>{item.quantity}</Text>
                  </Group>
                  <Group position="apart">
                    <Text>Price: </Text>
                    <Text>
                      {formatPrice(Number(item.price) * item.quantity)}
                    </Text>
                  </Group>
                </Stack>

                {item?.product?.imageUrl && (
                  <Image
                    src={`${IMAGE_BUCKET}/${item?.product?.imageUrl}`}
                    className={classes.image}
                    alt={item.product?.name}
                    width={100}
                    height={100}
                  />
                )}
              </Group>
            </Card>
          </div>
        ))}
      </Card>
    </Container>
  );
};

export default OrderCard;
