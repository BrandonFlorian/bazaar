import {
  CardResponse,
  CreateCardPayload,
  PublicKey,
  UpdateCardPayload,
} from "@/types/circle";
import { nullIfEmpty } from "@/utils/dataUtils";

export class CardService {
  public static async getPCIPublicKey(): Promise<PublicKey> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CIRCLE_API}encryption/public`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return data.data as PublicKey;
  }

  public static async getCardById(cardId: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CIRCLE_API}/cards/${cardId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization: ": `Bearer ${process.env.CIRCLE_API_KEY}`,
        },
      }
    );
    const data = response.json();
    return data;
  }

  public static async getCards(
    pageBefore: string,
    pageAfter: string,
    pageSize: string
  ) {
    const queryParams = {
      pageBefore,
      pageAfter,
      pageSize,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CIRCLE_API}/cards`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
        },
      }
    );
    const data = response.json();
    return data;
  }

  public static async createCard(
    payload: CreateCardPayload
  ): Promise<CardResponse> {
    if (payload.metadata) {
      payload.metadata.phoneNumber = nullIfEmpty(payload.metadata.phoneNumber);
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_CIRCLE_API}cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CIRCLE_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data.data as CardResponse;
  }

  public static async updateCard(cardId: string, payload: UpdateCardPayload) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CIRCLE_API}/cards/${cardId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization:": `Bearer ${process.env.CIRCLE_API_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = response.json();
    return data;
  }
}
