import {
  CreateCardPaymentPayload,
  PaymentResponse as CirclePaymentResponse,
} from "@/types/circle";

export class PaymentService {
  public static async sendPayment(
    payload: CreateCardPaymentPayload
  ): Promise<CirclePaymentResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CIRCLE_API}payments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    return data.data as CirclePaymentResponse;
  }

  public static async getPaymentById(paymentId: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CIRCLE_API}payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    return data.data;
  }
}
