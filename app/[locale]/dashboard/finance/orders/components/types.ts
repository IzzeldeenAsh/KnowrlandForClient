export type KnowledgeDocument = {
  file_name: string;
  file_extension: string;
  price: number;
};

export type KnowledgeItem = {
  type: string;
  title: string;
};

export type Suborder = {
  knowledge: KnowledgeItem[];
  knowledge_documents: KnowledgeDocument[][];
};

export type Payment = {
  method: string;
  provider: string | null;
  amount: number;
  currency: string;
  status: string;
  confirmed_at: string;
};

export type FulfillmentUser = {
  id: number;
  name: string;
  email: string;
  profile_photo_url: string | null;
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
  amount: number;
  service: string;
  currency: string;
  date: string;
  order_no: string;
  invoice_no: string;
  order_data: Suborder;
  status: string;
  payment: Payment;
  fulfillment_staus: string;
  fulfillment_attempts: FulfillmentAttempt[];
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
};

