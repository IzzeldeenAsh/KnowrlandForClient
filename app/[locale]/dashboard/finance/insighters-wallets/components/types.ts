export type InsighterCompany = {
  uuid: string;
  legal_name: string;
  logo: string;
  verified: boolean;
};

export type InsighterWalletRecord = {
  id: number;
  uuid: string;
  name: string;
  email: string;
  country: string;
  phone_code: string | null;
  phone: string | null;
  whatsapp_country_code: string | null;
  whatsapp_number: string | null;
  sms_country_code: string | null;
  sms_number: string | null;
  profile_photo_url: string | null;
  balance: number | string;
  payment_type: string;
  last_wired_transfer: string | null;
  company?: InsighterCompany;
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

