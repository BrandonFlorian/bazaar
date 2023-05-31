import { OpenPGPService } from "@/services/openPGPservice";
import { PaymentData, PublicKey } from "@/types/circle";
import { CheckoutFormValues } from "./CheckoutForm.types";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
export const useCheckoutForm = () => {
  const prepareCardPayload = async (
    payload: CheckoutFormValues
  ): Promise<PaymentData> => {
    const { card_number, cvv, expiry_date, country, email, ...data } = payload;

    const [expMonth, expYear] = expiry_date.split("/");
    const sessionId: string = "test-session-id";

    const hashedSessionId: string = crypto
      .createHash("md5")
      .update(sessionId)
      .digest("hex");

    return {
      cardDetails: { number: card_number.trim().replace(/\D/g, ""), cvv },
      billingDetails: {
        ...data,
        country: country,
        district: country,
        email: email,
      },
      metadata: {
        email: email,
        sessionId: hashedSessionId,
        ipAddress: "",
      },
      expiry: {
        expMonth: parseInt(expMonth),
        expYear: parseInt("20" + expYear),
      },
    };
  };

  const createEncryptedCard = async (data: PaymentData) => {
    try {
      const publicKey: PublicKey = await fetch("/api/circle/publicKey", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      const encryptedData = await OpenPGPService.encrypt(
        data.cardDetails,
        publicKey
      );
      const uuid: string = uuidv4();

      const cardPayload = {
        idempotencyKey: uuid,
        keyId: encryptedData.keyId,
        encryptedData: encryptedData.encryptedMessage,
        billingDetails: data.billingDetails,
        metadata: data.metadata,
        ...data.expiry,
      };

      return cardPayload;
    } catch (err) {
      console.log(err);
    }
  };

  return { prepareCardPayload, createEncryptedCard };
};
