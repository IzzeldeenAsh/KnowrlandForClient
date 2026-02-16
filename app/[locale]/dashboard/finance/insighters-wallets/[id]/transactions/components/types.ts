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

export type WalletTransactionRecord = {
  transaction: string; // deposit | withdraw
  amount: number;
  date: string;
  type: string;
  type_key: string;
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

