export type KnowledgeDocument = {
  file_name: string;
  file_extension: string;
  price: number;
};

export type KnowledgeItem = {
  type: string;
  title: string;
};

export type MeetingBooking = {
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  status_name?: string;
  title: string;
  description: string;
};

export type Suborder = {
  knowledge?: KnowledgeItem[];
  knowledge_documents?: KnowledgeDocument[][];
  meeting_booking?: MeetingBooking;
};

export type User = {
  name: string;
  first_name?: string;
  last_name?: string;
  email: string;
  profile_photo_url: string | null;
  country_id?: number;
  roles: string[];
};

export type Order = {
  uuid: string;
  user: User;
  service: string;
  status: string;
  date: string;
  order_no: string;
  invoice_no: string;
  orderable: Suborder;
};

export type Company = {
  uuid: string;
  legal_name: string;
  logo: string;
  verified: boolean;
};

export type Insighter = {
  uuid: string;
  name: string;
  profile_photo_url: string | null;
  roles: string[];
  company: Company | null;
};

export type TransactionRecord = {
  transaction: string; // deposit | withdraw
  amount: number;
  date: string;
  type: string; // income_knowledge, withdraw_payout_insighter_meeting, ...
  type_key?: string;
  provider_fee: string;
  net_amount: string;
  order: Order;
  insighter?: Insighter;
};

export type TransactionMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type TransactionResponse = {
  data: TransactionRecord[];
  meta: TransactionMeta;
};

export type PlatformBalanceResponse = {
  data: {
    balance: number;
    provider_fee: number;
    net_amount: number;
  };
};

export type StatisticsResponse = {
  data: {
    weekly?: Record<string, { deposit: number; withdraw: number }>;
    monthly?: Record<string, { deposit: number; withdraw: number }>;
    yearly?: Record<string, { deposit: number; withdraw: number }>;
  };
};

export type ChartDataPoint = {
  date: string;
  deposits: number;
  withdrawals: number;
};

