import React, { FC } from "react";
import { Container, Text, Modal, Loader, Center } from "@mantine/core";
import {
  IconCircleCheckFilled,
  IconSquareRoundedXFilled,
} from "@tabler/icons-react";
type Props = {
  opened: boolean;
  onClose: () => void;
  status: "pending" | "confirmed" | "failed" | "paid";
  text: string;
};

export const PaymentCheckModal: FC<Props> = (props: Props) => {
  const { opened, onClose, status, text } = props;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Payment Check"
      size="md"
      closeOnEscape={false}
    >
      <Container>
        <Text align="center">{text}</Text>

        <Center>
          {status === "confirmed" && (
            <IconCircleCheckFilled
              color="green"
              style={{
                color: "green",
              }}
              size={100}
            />
          )}
          {status === "failed" && (
            <IconSquareRoundedXFilled
              color="red"
              style={{
                color: "red",
              }}
              size={100}
            />
          )}
          {status === "paid" && (
            <IconCircleCheckFilled
              color="green"
              style={{
                color: "green",
              }}
              size={100}
            />
          )}
          {status === "pending" && <Loader size={100} />}
        </Center>
      </Container>
    </Modal>
  );
};

export default PaymentCheckModal;
