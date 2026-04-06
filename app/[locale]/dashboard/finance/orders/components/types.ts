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

export type Payment = {
  method: string;
  provider: string | null;
  amount: number;
  currency: string;
  status: string;
  confirmed_at?: string | null;
  provider_payment_method_type?: string | null;
  provider_card_last_number?: string | null;
  provider_card_brand?: string | null;
  provide_receipt_url?: string | null;
  billing_address?: string | null;
  payment_intent_confirmed_at?: string | null;
  charge_succeeded_at?: string | null;
};

export type FulfillmentUser = {
  id: number;
  name: string;
  email: string;
  profile_photo_url: string | null;
};

export type CompanyInfo = {
  uuid: string;
  legal_name: string;
  logo?: string | null;
  verified?: boolean;
};

export type CustomerUser = {
  name: string;
  email: string;
  first_name?: string;
  last_name?: string;
  type?: string;
  uuid?: string;
  profile_photo_url?: string | null;
  roles?: string[];
  company?: CompanyInfo | null;
};

export type FulfillmentAttempt = {
  user: FulfillmentUser;
  step: string;
  status: string;
  retry_count: number;
  error_message: string | null;
  attempted_at: string;
};

export type OrderRecord = {
  uuid: string;
  user?: CustomerUser;
  insighter?: (CustomerUser & { id?: number }) | null;
  amount: number;
  service: string;
  service_name?: string;
  currency: string;
  date: string;
  order_no: string;
  invoice_no: string;
  order_data?: Suborder;
  orderable?: Suborder;
  status: string;
  payment: Payment;
  fulfillment_staus: string;
  fulfillment_attempts: FulfillmentAttempt[];
  knowledge_download_id?: string | null;
};

export type OrderMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type OrdersResponse = {
  data: OrderRecord[];
  meta: OrderMeta;
  links?: {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
  };
};
