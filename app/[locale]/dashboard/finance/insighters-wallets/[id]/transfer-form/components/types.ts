export type CountryRef = {
  id: number;
  name: string;
  flag: string;
};

export type TransferFormRecord = {
  user_name: string;
  user_email: string;
  user_balance: number;
  account_name: string | null;
  account_country: CountryRef | null;
  account_address?: string | null;
  account_phone_code: string | null;
  account_phone: string | null;
  bank_name: string | null;
  bank_country: CountryRef | null;
  bank_address: string | null;
  bank_iban: string | null;
  bank_swift_code: string | null;
  status: string;
};

export type TransferFormResponse = {
  data: TransferFormRecord[];
};

export type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page?: number;
  total?: number;
  from?: number;
  to?: number;
};

export type WiredTransferReceiptListItem = {
  id: number;
  receipt_no: string;
  receipt_date: string;
  handel_by?: string | null;
  handled_by?: string | null;
  amount: string | number;
  note?: string | null;
};

export type WiredTransferReceiptListResponse = {
  data?: WiredTransferReceiptListItem[];
  links?: {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
  };
  meta?: PaginationMeta;
};

export type WiredTransferReceiptDetails = {
  receipt_no: string;
  receipt_date: string;
  handel_by?: string | null;
  handled_by?: string | null;
  amount: string | number;
  note?: string | null;
  receipt_file?: string | null;
};

export type WiredTransferReceiptDetailsResponse = {
  data?: WiredTransferReceiptDetails | null;
};
