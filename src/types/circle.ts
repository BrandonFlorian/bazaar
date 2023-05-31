import { OrderItem } from "@prisma/client";

export interface CardMetaData {
  email: string;
  phoneNumber?: string;
  sessionId?: string;
  ipAddress?: string;
}

export interface UpdateCardPayload {
  keyId: string;
  encryptedData: string;
  expMonth: number;
  expYear: number;
}

export interface CardDetails {
  number: string;
  cvv: string;
}

export type CreateCardPayload = {
  idempotencyKey: string;
  keyId: string;
  encryptedData: string; // Card number and CVV
  billingDetails: BillingDetails;
  expMonth: number;
  expYear: number;
  metadata: CardMetaData;
};
export interface CardResponse {
  id: string;
}
export type CardPayment = {
  idempotencyKey: string;
  keyId: string;
  metadata: CardMetaData;
  amount: number;
  currency: string;
  verification: "none" | "cvv" | "three_d_secure";
  verificationSuccessUrl: string;
  verificationFailureUrl: string;
  source: {
    id: string;
    type: "card";
  };
  description: string;
  encryptedData: string;
  channel?: string;
};

export interface PublicKey {
  keyId: string;
  publicKey: string;
}

export interface BillingDetails {
  email: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
  district?: string;
}

export interface PaymentData {
  cardDetails: CardDetails;
  billingDetails: BillingDetails;
  metadata: CardMetaData;
  expiry: {
    expMonth: number;
    expYear: number;
  };
}

export enum PaymentStatus {
  pending = "pending",
  initiated = "initiated",
  confirmed = "confirmed",
  paid = "paid",
  failed = "failed",
  action_required = "action_required",
  success = "success",
  complete = "complete",
}
export interface PaymentAmount {
  amount: string;
  currency: string;
}
export interface PaymentSource {
  id: string;
  type: string;
}

interface RequiredAction {
  type: string;
  redirectUrl: string;
}
enum PaymentCvvVerification {
  not_requested = "not_requested",
  pass = "pass",
  fail = "fail",
  unavailable = "unavailable",
  pending = "pending",
}
export interface PaymentVerification {
  avs: string;
  cvv: PaymentCvvVerification;
  three_d_secure?: "pass" | "fail";
  eci?: "00" | "01" | "02" | "05" | "06" | "07";
}
export interface PaymentResponse {
  id: string;
  type: string;
  merchantId: string;
  merchantWalletId?: string;
  amount: PaymentAmount;
  source: PaymentSource;
  description?: string;
  status: PaymentStatus;
  captured?: boolean;
  captureAmount: PaymentAmount;
  captureDate?: string;
  requiredAction?: RequiredAction;
  verification?: PaymentVerification;
  cancel?: Record<string, any>;
  fees?: PaymentAmount;
  trackingRef?: string;
  metadata?: { email: string; phoneNumber?: string };
  riskEvaluation?: {
    decision?: "approved" | "denied" | "review";
    reason?: string;
  };
  channel?: string;
  createDate?: string;
  updateDate?: string;
  errorCode?: string;
}

export interface PaymentMetaData {
  email: string;
  phoneNumber?: string;
  sessionId: string;
  ipAddress: string;
}

export interface PaymentAmount {
  amount: string;
  currency: string;
}

export interface PaymentSource {
  id: string;
  type: string;
}

export interface BasePaymentPayload {
  idempotencyKey: string;
  amount: PaymentAmount;
  source: PaymentSource;
  description: string;
  channel?: string;
  metadata: PaymentMetaData;
}

export interface CreateCardPaymentPayload extends BasePaymentPayload {
  verification?: string;
  autoCapture?: boolean;
  verificationSuccessUrl?: string;
  verificationFailureUrl?: string;
  keyId?: string;
  encryptedData?: string;
}

export interface RefundPaymentPayload {
  idempotencyKey: string;
  amount: PaymentAmount;
  reason: string | undefined;
}

export interface CapturePaymentPayload {
  idempotencyKey: string;
  amount: PaymentAmount;
}

interface RequiredAction {
  type: string;
  redirectUrl: string;
}

export interface PaymentVerification {
  avs: string;
  cvv: PaymentCvvVerification;
  three_d_secure?: "pass" | "fail";
  eci?: "00" | "01" | "02" | "05" | "06" | "07";
}

export interface PaymentResponse {
  id: string;
  type: string;
  merchantId: string;
  merchantWalletId?: string;
  amount: PaymentAmount;
  source: PaymentSource;
  description?: string;
  status: PaymentStatus;
  captured?: boolean;
  captureAmount: PaymentAmount;
  captureDate?: string;
  requiredAction?: RequiredAction;
  verification?: PaymentVerification;
  cancel?: Record<string, any>;
  fees?: PaymentAmount;
  trackingRef?: string;
  metadata?: { email: string; phoneNumber?: string };
  riskEvaluation?: {
    decision?: "approved" | "denied" | "review";
    reason?: string;
  };
  channel?: string;
  createDate?: string;
  updateDate?: string;
  errorCode?: string;
}

export type OrderItems = {
  product_id: string;
  quantity: number;
  price: number;
};

export type OrderResponse = {
  id: string;
  order_items: OrderItem[];
  order_status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};
