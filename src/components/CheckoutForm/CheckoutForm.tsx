import React, { type FC, FormEvent } from "react";
import { Button, Container, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { type Profile } from "@prisma/client";
import { CartItem, useCart } from "@/context/cartContext";
import { CheckoutFormValues } from "./CheckoutForm.types";
import { useCheckoutForm } from "./useCheckoutForm";
import { CreateCardPayload, PaymentData } from "@/types/circle";
import PaymentCheckModal from "../PaymentCheckModal";
import CountrySelect from "../CountrySelect";
import { countryPhoneCodes } from "../../../public/config/constants";
type Props = {
  profile: Profile | null;
  nextStep: () => void;
  setOrderId: (orderId: string) => void;
  mutate: () => void;
};
export const CheckoutForm: FC<Props> = (props: Props) => {
  const { items, clearCart } = useCart();

  console.log(items);
  const { prepareCardPayload, createEncryptedCard } = useCheckoutForm();
  const { profile, setOrderId, mutate } = props;

  const [isLoading, setIsLoading] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [status, setStatus] = React.useState<
    "pending" | "confirmed" | "failed" | "paid"
  >("pending");
  const [statusText, setStatusText] = React.useState("");
  const [phoneCode, setPhoneCode] = React.useState("+1");

  const handleSubmit = async (values: CheckoutFormValues) => {
    try {
      setIsLoading(true);
      setStatus("pending");
      setStatusText("Creating Order...");
      setOpened(true);
      const order = await createOrder();
      setOrderId(order.id);

      setStatusText("Encrypting Card details...");
      const paymentData: PaymentData = await prepareCardPayload(values);
      const cardPayload: CreateCardPayload | undefined =
        await createEncryptedCard(paymentData);

      setStatusText("Processing Payment...");
      const response = await fetch("/api/circle/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body will include the cardPayload and the id of the order
        body: JSON.stringify({
          order_id: order.id,
          cardPayload: cardPayload,
        }),
      });

      const data = await response.json();
      switch (data.status) {
        case "pending":
          setStatusText("Payment Pending...");
          break;
        case "confirmed":
          setStatusText("Payment Confirmed...");
          clearCart();
          mutate();
          break;
        case "failed":
          setStatusText("Payment Failed...");
          break;
        case "paid":
          setStatusText("Payment Paid...");
          clearCart();
          break;
        default:
          setStatusText("Payment Pending...");
          break;
      }
      setStatus(data.status);

      setIsLoading(false);
      setOpened(false);
      props.nextStep();
    } catch (error) {
      console.log(error);
      setStatusText("Payment Failed...");
      setStatus("failed");
      setIsLoading(false);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile_id: profile?.id,
          items: items.map((item: CartItem) => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<CheckoutFormValues>({
    initialValues: {
      email: profile?.email || "",
      name: profile?.firstName + " " + profile?.lastName || "",
      phone: profile?.phoneNumber || "",
      line1: "",
      line2: "",
      city: "",
      postalCode: "",
      country: "CA",
      card_number: "",
      expiry_date: "",
      cvv: "",
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      name: (val: string) => (val ? null : "Name is required"),
      phone: (val: string) =>
        /^\d{10}$/.test(val) ? null : "Invalid phone number",
      line1: (val: string) => (val ? null : "Address is required"),
      city: (val: string) => (val ? null : "City is required"),
      postalCode: (val: string) => (val ? null : "Postal code is required"),
      country: (val: string) => (val ? null : "Country is required"),
      card_number: (val: string) => {
        // Check if card number is 16 digits long
        if (!/^\d{16}$/.test(val)) {
          return "Invalid card number";
        }
        return null;
      },
      expiry_date: (val: string) => {
        // Check if expiry date is in the format "MM/YY"
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(val)) {
          return "Invalid card expiry date";
        }
        return null;
      },
      cvv: (val: string) => {
        // Check if CVC is a 3-digit number
        if (!/^\d{3}$/.test(val)) {
          return "Invalid CVC";
        }
        return null;
      },
    },
  });

  return (
    <Container size="xs">
      <form
        onSubmit={(e: FormEvent<HTMLElement>) => {
          e.preventDefault();
          form.onSubmit(async () => {
            const values = {
              ...form.values,
              phone: phoneCode + form.values.phone,
            };

            await handleSubmit(values);
          })();
        }}
      >
        <TextInput
          required
          label="Card Number"
          placeholder="Card Number"
          value={form.values.card_number}
          onChange={(event) => {
            let value = event.currentTarget.value;
            value = value.replace(/[^0-9]/g, ""); // Remove non digits
            if (value.length > 16) {
              // If the length exceeds 16 digits, trim it
              value = value.slice(0, 16);
            }

            form.setFieldValue("card_number", value);
          }}
          error={form.errors.card_number && String(form.errors.card_number)}
        />
        <TextInput
          required
          label="Card Expiry"
          placeholder="Card Expiry"
          value={form.values.expiry_date}
          onChange={(event) => {
            let value = event.currentTarget.value;
            value = value.replace(/[^0-9]/g, ""); // Remove non digits
            if (value.length > 4) {
              // If the length exceeds 4 digits, trim it
              value = value.slice(0, 4);
            }
            if (value.length > 2) {
              // Insert slash
              value = value.slice(0, 2) + "/" + value.slice(2);
            }
            form.setFieldValue("expiry_date", value);
          }}
          error={form.errors.expiry_date && String(form.errors.expiry_date)}
        />
        <TextInput
          required
          label="Card CVC"
          placeholder="Card CVC"
          value={form.values.cvv}
          onChange={(event) => {
            let value = event.currentTarget.value;
            value = value.replace(/[^0-9]/g, "");
            if (value.length > 3) {
              value = value.slice(0, 3);
            }
            form.setFieldValue("cvv", value);
          }}
          error={form.errors.cvv && String(form.errors.cvv)}
        />
        <TextInput
          required
          label="Name"
          placeholder="Name"
          value={form.values.name}
          onChange={(event) =>
            form.setFieldValue("name", event.currentTarget.value)
          }
          error={form.errors.name && String(form.errors.name)}
        />
        <TextInput
          required
          label="Email"
          placeholder="Email"
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          error={form.errors.email && String(form.errors.email)}
        />
        <TextInput
          required
          label="Phone"
          placeholder="Phone"
          icon={phoneCode}
          value={form.values.phone}
          onChange={(event) =>
            form.setFieldValue("phone", event.currentTarget.value)
          }
          error={form.errors.phone && String(form.errors.phone)}
        />
        <TextInput
          required
          label="Address"
          placeholder="Address"
          value={form.values.line1}
          onChange={(event) =>
            form.setFieldValue("line1", event.currentTarget.value)
          }
          error={form.errors.line1 && String(form.errors.line1)}
        />
        <TextInput
          label="Address Line 2"
          placeholder="Address Line 2"
          value={form.values.line2}
          onChange={(event) =>
            form.setFieldValue("line2", event.currentTarget.value)
          }
          error={form.errors.line2 && String(form.errors.line2)}
        />
        <TextInput
          required
          label="City"
          placeholder="City"
          value={form.values.city}
          onChange={(event) =>
            form.setFieldValue("city", event.currentTarget.value)
          }
          error={form.errors.city && String(form.errors.city)}
        />
        <TextInput
          required
          label="Postal Code"
          placeholder="Postal Code"
          value={form.values.postalCode}
          onChange={(event) =>
            form.setFieldValue("postalCode", event.currentTarget.value)
          }
          error={form.errors.postalCode && String(form.errors.postalCode)}
        />
        <Select
          {...form.getInputProps("country")}
          itemComponent={CountrySelect}
          data={countryPhoneCodes.map(({ name, code, phoneCode }) => ({
            value: code,
            label: name,
            phoneCode: phoneCode,
          }))}
          value={form.values.country}
          onChange={(e: string) => {
            form.setFieldValue("country", e);
            const phoneCode = countryPhoneCodes.find(
              (country) => country.code === e
            )?.phoneCode;
            if (!phoneCode) return;
            setPhoneCode(phoneCode);
          }}
          label={"Country"}
          name="country"
          data-name="country"
          searchable={true}
          nothingFound={"No country found"}
          placeholder={"Select country"}
        />
        <Button type="submit" disabled={isLoading} fullWidth mt={10}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
      <PaymentCheckModal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        status={status}
        text={statusText}
      />
    </Container>
  );
};
