export type WalletUser = {
  name: string;
  email: string;
  first_name?: string;
  last_name?: string;
  type?: string;
  profile_photo_url: string | null;
  roles?: string[];
  uuid?: string;
  company?: {
    uuid: string;
    legal_name: string;
    logo: string;
    verified: boolean;
  };
};

export type WalletOrder = {
  uuid: string;
  service: string;
  status: string;
  date: string;
  order_no: string;
  invoice_no: string;
  amount?: number;
  user?: WalletUser;
  insighter_profit_rate?: string;
};

export type WalletPayment = {
  method?: string;
  type?: string; // full | down_payment | installment ...
  provider?: string;
  invoice_no?: string;
  amount?: number;
  provider_payment_method_type?: string | null;
  provider_card_last_number?: string | null;
  provider_card_brand?: string | null;
  provide_receipt_url?: string | null;
  billing_address?: unknown;
  payment_intent_confirmed_at?: string | null;
  charge_succeeded_at?: string | null;
};

export type WalletTransactionRecord = {
  transaction: string; // deposit | withdraw
  amount: number;
  date: string;
  type: string;
  type_key: string;
  payment?: WalletPayment;
  order: WalletOrder;
};

export type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

