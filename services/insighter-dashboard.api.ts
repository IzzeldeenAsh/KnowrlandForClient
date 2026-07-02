'use client';

import { getAuthToken } from '@/lib/authToken';

/**
 * API client for insighter dashboard features. Endpoints mirror the Angular
 * services in KNOLDG-APP/src/app/_fake/services.
 */
const API_BASE = 'https://api.foresighta.co/api';

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export async function apiRequest<T>(
  path: string,
  options: {
    method?: string;
    locale?: string;
    body?: unknown;
    params?: Record<string, string | number | undefined>;
  } = {}
): Promise<T> {
  const { method = 'GET', locale = 'en', body, params } = options;
  const token = getAuthToken();

  const url = new URL(`${API_BASE}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': locale,
      'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    let errors: Record<string, string[]> | undefined;
    try {
      const data = await response.json();
      message = data?.message ?? message;
      errors = data?.errors;
    } catch {
      // non-JSON error body
    }
    throw new ApiError(response.status, message, errors);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

/* ------------------------------ Wallet ------------------------------ */

export async function getWalletBalance(locale: string): Promise<number> {
  const res = await apiRequest<{ data: { balance: number } }>('/account/wallet/balance', { locale });
  return Number(res?.data?.balance ?? 0);
}

export type WalletPeriod = 'weekly' | 'monthly' | 'yearly';

export interface WalletTransaction {
  transaction: 'deposit' | 'withdraw';
  amount: number;
  date: string;
  type: string;
  type_key: string;
  order?: {
    uuid?: string;
    order_no?: string;
    amount?: number;
    currency?: string;
    orderables?: unknown[];
    [key: string]: unknown;
  };
  payment?: Record<string, unknown>;
}

export async function getWalletTransactions(
  locale: string,
  page = 1,
  perPage = 10,
  period?: WalletPeriod
): Promise<{ data: WalletTransaction[]; meta: PaginationMeta }> {
  return apiRequest('/account/wallet/transaction', {
    locale,
    params: { page, per_page: perPage, per_time: period },
  });
}

export interface WalletStatisticsBucket {
  deposit: number;
  withdraw: number;
}

export async function getWalletStatistics(
  locale: string,
  period: WalletPeriod
): Promise<Record<string, WalletStatisticsBucket>> {
  const res = await apiRequest<{
    data: Partial<Record<WalletPeriod, Record<string, WalletStatisticsBucket>>>;
  }>('/account/wallet/statistics', { locale, params: { per_time: period } });
  return res.data?.[period] ?? {};
}

/* ----------------------------- Meetings ----------------------------- */

export interface ClientMeetingStatistics {
  today: number;
  upcoming?: number;
  past?: number;
  postponed?: number;
}

/** Insighter-side meeting statistics (Angular MeetingsService.getClientMeetingStatistics). */
export async function getInsighterMeetingStatistics(locale: string): Promise<ClientMeetingStatistics> {
  const res = await apiRequest<{ data: ClientMeetingStatistics }>('/insighter/meeting/statistics', { locale });
  return res.data;
}

export interface SentMeeting {
  uuid: string;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  title?: string;
  [key: string]: unknown;
}

/** Client-side sent meetings list (Angular SentMeetingsService.getSentMeetings). */
export async function getSentMeetings(
  locale: string,
  page = 1,
  perPage = 30
): Promise<{ data: SentMeeting[] }> {
  return apiRequest<{ data: SentMeeting[] }>('/account/meeting/client/list', {
    locale,
    params: { page, per_page: perPage },
  });
}

/* ----------------------------- Requests ----------------------------- */

export interface UserRequest {
  id: number;
  parent_id?: number | null;
  final_status?: string;
  [key: string]: unknown;
}

export async function getUserRequests(locale: string): Promise<UserRequest[]> {
  const res = await apiRequest<{ data: UserRequest[] }>('/account/request', { locale });
  return res.data ?? [];
}

export async function getCompanyInsighterRequests(locale: string): Promise<UserRequest[]> {
  const res = await apiRequest<{ data: UserRequest[] }>('/company/insighter/request', { locale });
  return res.data ?? [];
}

/** Count pending parent requests across user + (optionally) company insighter requests. */
export async function getPendingRequestsCount(locale: string, isCompany: boolean): Promise<number> {
  const lists = await Promise.all([
    getUserRequests(locale).catch(() => [] as UserRequest[]),
    isCompany ? getCompanyInsighterRequests(locale).catch(() => [] as UserRequest[]) : Promise.resolve([]),
  ]);
  return lists
    .flat()
    .filter((r) => r.parent_id === 0 || r.parent_id === null || r.parent_id === undefined)
    .filter((r) => r.final_status?.toLowerCase() === 'pending').length;
}

/* ----------------------------- Agreement ---------------------------- */

export async function checkLatestAgreement(locale: string): Promise<boolean> {
  const res = await apiRequest<{ data: { accept: boolean } }>('/account/agreement/check', { locale });
  return !!res?.data?.accept;
}

/* ------------------------- Project settings ------------------------- */

export interface ProjectAccountCheckResults {
  pass: boolean;
  [key: string]: unknown;
}

export async function getProjectAccountCheck(locale: string): Promise<ProjectAccountCheckResults> {
  const res = await apiRequest<{ data: ProjectAccountCheckResults }>(
    '/insighter/project/account/initiate/check',
    { locale }
  );
  return res.data;
}

/* ------------------------ Knowledge statistics ---------------------- */

export interface KnowledgeTypeStatistic {
  type: string;
  count: number;
}

export async function getKnowledgeTypeStatistics(locale: string): Promise<KnowledgeTypeStatistic[]> {
  const res = await apiRequest<{ data: KnowledgeTypeStatistic[] }>(
    '/insighter/library/knowledge/statistics',
    { locale }
  );
  return res.data ?? [];
}

/* ----------------------- Company dashboard stats -------------------- */

export interface CompanyDashboardStatistics {
  knowledge_published_statistics?: {
    total: number;
    type: Record<string, number>;
  };
  [key: string]: unknown;
}

export async function getCompanyDashboardStatistics(locale: string): Promise<CompanyDashboardStatistics> {
  const res = await apiRequest<{ data: CompanyDashboardStatistics }>(
    '/company/insighter/statistics',
    { locale }
  );
  return res.data;
}

/* ------------------------- Knowledge library ------------------------ */

export interface MyKnowledge {
  id: number;
  type: 'data' | 'insight' | 'report' | 'manual' | 'course' | 'media' | 'statistic';
  title: string;
  slug: string;
  description: string;
  total_price: string;
  status: string;
  status_label?: string;
  published_at?: string;
  publish_as?: 'both' | 'package' | 'standalone';
  account_manager_process?: {
    need_to_review: boolean;
    action: string | null;
    request_id: number | null;
    request_status: string | null;
  };
  [key: string]: unknown;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export async function getMyKnowledgeList(
  locale: string,
  options: { page?: number; status?: string; keyword?: string; type?: string } = {}
): Promise<{ data: MyKnowledge[]; meta: PaginationMeta }> {
  return apiRequest('/insighter/library/knowledge', {
    locale,
    params: {
      page: options.page ?? 1,
      status: options.status || undefined,
      keyword: options.keyword || undefined,
      type: options.type || undefined,
    },
  });
}

export async function deleteMyKnowledge(locale: string, id: number): Promise<void> {
  await apiRequest(`/insighter/library/knowledge/${id}`, { locale, method: 'DELETE' });
}

export async function setMyKnowledgeStatus(
  locale: string,
  id: number,
  status: string,
  publishedAt: string
): Promise<void> {
  await apiRequest(`/insighter/library/knowledge/status/${id}`, {
    locale,
    method: 'PUT',
    body: { status, published_at: publishedAt },
  });
}

/* ------------------------- Knowledge packages ----------------------- */

export interface KnowledgePackage {
  id: number;
  name: string;
  status?: string;
  discount?: number;
  final_price?: string | number;
  knowledge?: MyKnowledge[];
  [key: string]: unknown;
}

export async function getPackagesList(locale: string): Promise<KnowledgePackage[]> {
  const res = await apiRequest<{ data: KnowledgePackage[] }>('/insighter/library/package/list', { locale });
  return res.data ?? [];
}

export async function deletePackage(locale: string, packageId: number): Promise<void> {
  await apiRequest(`/insighter/library/package/${packageId}`, { locale, method: 'DELETE' });
}

export async function getPackageKnowledge(
  locale: string,
  packageId: number
): Promise<{ data: MyKnowledge[] }> {
  return apiRequest(`/insighter/library/package/knowledge/list/${packageId}`, { locale });
}

export async function setPackageStatus(
  locale: string,
  packageId: number,
  status: string,
  publishedAt?: string
): Promise<void> {
  await apiRequest(`/insighter/library/package/status/${packageId}`, {
    locale,
    method: 'PUT',
    body: { status, ...(publishedAt ? { published_at: publishedAt } : {}) },
  });
}

/* ------------------------------ Requests (paged) -------------------- */

export interface RequestType {
  key: string;
  label: string;
}

export interface DetailedUserRequest {
  id: number;
  type: RequestType;
  requestable_type: string;
  requestable: {
    legal_name?: string;
    first_name?: string;
    last_name?: string;
    profile_photo_url?: string | null;
    [key: string]: unknown;
  };
  comments: string;
  staff_notes: string | null;
  status: string;
  status_label: string;
  final_status: string;
  final_status_label: string;
  children: DetailedUserRequest[];
  identity?: string;
  identity_object?: { title?: string; [key: string]: unknown };
  handel_at?: string | null;
  updated_at?: string;
  created_at?: string;
  [key: string]: unknown;
}

export interface RequestsPage {
  data: DetailedUserRequest[];
  meta: PaginationMeta;
}

function normalizeRequestsPage(res: any, page: number, perPage: number): RequestsPage {
  const data: DetailedUserRequest[] = Array.isArray(res?.data) ? res.data : [];
  const meta: PaginationMeta = res?.meta ?? {
    current_page: page,
    last_page: 1,
    per_page: perPage,
    total: data.length,
  };
  return { data, meta };
}

export async function getUserRequestsPage(
  locale: string,
  page: number,
  perPage: number,
  filters: { type?: string; final_status?: string } = {}
): Promise<RequestsPage> {
  const res = await apiRequest<any>('/account/request', {
    locale,
    params: { page, per_page: perPage, type: filters.type, final_status: filters.final_status },
  });
  return normalizeRequestsPage(res, page, perPage);
}

export async function getInsighterRequestsPage(
  locale: string,
  page: number,
  perPage: number,
  filters: { type?: string; final_status?: string } = {}
): Promise<RequestsPage> {
  const res = await apiRequest<any>('/company/insighter/request', {
    locale,
    params: { page, per_page: perPage, type: filters.type, final_status: filters.final_status },
  });
  return normalizeRequestsPage(res, page, perPage);
}

/** POST multipart/form-data with auth headers (Angular services use FormData). */
export async function apiFormRequest<T = unknown>(
  path: string,
  locale: string,
  fields: Record<string, string>
): Promise<T> {
  const token = getAuthToken();
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) formData.append(key, value);

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Language': locale,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    let errors: Record<string, string[]> | undefined;
    try {
      const data = await response.json();
      message = data?.message ?? message;
      errors = data?.errors;
    } catch {
      // non-JSON error body
    }
    throw new ApiError(response.status, message, errors);
  }
  try {
    return (await response.json()) as T;
  } catch {
    return undefined as T;
  }
}

/** Company approves/declines an insighter request. */
export async function updateInsighterRequestStatus(
  locale: string,
  requestId: number | string,
  status: 'approved' | 'declined',
  staffNotes: string
): Promise<void> {
  await apiFormRequest(`/company/insighter/request/${requestId}/accept`, locale, {
    status,
    staff_notes: staffNotes,
  });
}

/** Resend endpoints keyed by request type (mirror Angular UserRequestsService). */
export async function resendRequest(
  locale: string,
  typeKey: string,
  comments: string,
  parentId: string,
  knowledgeId?: string
): Promise<void> {
  switch (typeKey) {
    case 'activate_company':
      await apiFormRequest('/company/request/activate', locale, { comments, parent_id: parentId });
      return;
    case 'verified_company':
      await apiFormRequest('/company/request/verified', locale, { comments, parent_id: parentId });
      return;
    case 'deactivate_delete_company':
      await apiFormRequest('/company/request/deactivate-delete', locale, { comments, parent_id: parentId });
      return;
    case 'deactivate_delete_insighter':
      await apiFormRequest('/insighter/request/deactivate-delete', locale, { comments, parent_id: parentId });
      return;
    case 'accept_knowledge':
      if (!knowledgeId) throw new Error('knowledge_id required');
      await apiFormRequest('/insighter/request/knowledge/review', locale, {
        comments,
        parent_id: parentId,
        knowledge_id: knowledgeId,
      });
      return;
    default:
      throw new Error(`Unsupported request type: ${typeKey}`);
  }
}

/* ----------------------------- My downloads ------------------------- */

export interface DownloadDocument {
  uuid: string;
  file_name: string;
  price: number;
  file_extension: string;
  file_size: number;
  download_at?: string | null;
}

export interface DownloadKnowledgeItem {
  uuid: string;
  knowledge_slug: string;
  title: string;
  type: string;
  insighter: string;
  insighter_uuid: string;
  insighter_photo: string | null;
  purchase_date: string;
  documents: DownloadDocument[];
  company: { uuid: string; legal_name: string; logo: string; verified: boolean } | null;
  download_at?: string | null;
}

export async function getMyDownloads(
  locale: string,
  options: { page?: number; title?: string; archived?: boolean } = {}
): Promise<{ data: DownloadKnowledgeItem[]; meta: PaginationMeta }> {
  // Angular uses POST on the same URL (body optional); GET also works but we
  // mirror the POST call to keep behaviour identical.
  const params = new URLSearchParams({ page: String(options.page ?? 1), per_page: '10' });
  if (options.title?.trim()) params.set('title', options.title.trim());
  if (options.archived) params.set('archived', 'true');

  const token = getAuthToken();
  const response = await fetch(
    `${API_BASE}/account/library/my-knowledge?${params.toString()}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Language': locale,
        'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );
  if (!response.ok) throw new ApiError(response.status, `Request failed: ${response.status}`);
  return response.json();
}

/** Returns a temporary URL for downloading a single purchased document. */
export async function getDocumentDownloadUrl(locale: string, documentUuid: string): Promise<string> {
  const res = await apiRequest<{ data: { url: string } }>(
    `/account/library/my-knowledge/document/download/${documentUuid}`,
    { locale, method: 'POST', body: {} }
  );
  return res.data.url;
}

export async function archiveDownloadedKnowledge(locale: string, knowledgeUuid: string): Promise<void> {
  await apiRequest(`/account/library/my-knowledge/archive/${knowledgeUuid}`, {
    locale,
    method: 'POST',
    body: {},
  });
}

/* ------------------------------ Read later -------------------------- */

export interface ReadLaterItem {
  slug: string;
  title: string;
  type: string;
  total_price: string;
  published_at: string;
  insighter: {
    uuid: string;
    name: string;
    profile_photo_url: string | null;
    roles: string[];
    company?: { uuid: string; legal_name: string; logo: string | null; verified: boolean };
  };
  company?: { uuid: string; legal_name: string; logo: string | null; verified: boolean };
}

export async function getReadLaterList(
  locale: string,
  options: { page?: number; title?: string; type?: string } = {}
): Promise<{ data: ReadLaterItem[]; meta: PaginationMeta }> {
  return apiRequest('/account/favorite/knowledge', {
    locale,
    params: {
      page: options.page ?? 1,
      per_page: 10,
      title: options.title?.trim() || undefined,
      type: options.type?.trim() || undefined,
    },
  });
}

export async function removeReadLaterItem(locale: string, slug: string): Promise<void> {
  await apiRequest(`/account/favorite/knowledge/${slug}`, { locale, method: 'DELETE' });
}

/* -------------------------------- Orders ---------------------------- */

export interface OrderPaymentInfo {
  method: string;
  provider: string | null;
  amount: number;
  currency: string;
  status: string;
  provider_payment_method_type?: string | null;
  provider_card_last_number?: string | null;
  provider_card_brand?: string | null;
  provide_receipt_url?: string | null;
  confirmed_at?: string;
}

export interface OrderUser {
  name: string;
  first_name?: string;
  last_name?: string;
  profile_photo_url?: string | null;
  roles?: string[];
  company?: { uuid: string; legal_name: string; logo: string; verified: boolean };
  [key: string]: unknown;
}

export interface Order {
  uuid: string;
  service: string;
  status: string;
  amount: number;
  currency: string;
  date: string;
  order_no: string;
  invoice_no?: string;
  user?: OrderUser;
  payment?: OrderPaymentInfo;
  payments?: OrderPaymentInfo[];
  knowledge_download_id?: string;
  orderable: {
    knowledge?: { type: string; title: string; slug?: string }[];
    knowledge_documents?: { file_name: string; file_extension: string; price: number }[][];
    knowledge_download_id?: string;
    meeting_booking?: {
      date: string;
      start_time: string;
      end_time: string;
      status: string;
      status_name: string;
      title: string;
      description: string;
    };
    project?: { title?: string; project_no?: string; description?: string };
    insighter?: OrderUser;
  };
}

export type OrderKind = 'knowledge' | 'meeting' | 'project';

export async function getMyOrders(
  locale: string,
  kind: OrderKind,
  page = 1
): Promise<{ data: Order[]; meta: PaginationMeta }> {
  return apiRequest(`/account/order/${kind}`, { locale, params: { page, per_page: 5 } });
}

/* ------------------------------ Meetings lists ---------------------- */

export interface ReceivedMeeting {
  uuid: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'approved' | 'pending' | 'postponed';
  title: string;
  description: string;
  meeting_url: string;
  client: {
    name: string;
    first_name: string;
    last_name: string;
    uuid: string;
    email: string;
    profile_photo_url: string | null;
    country: string | null;
  };
  rate: string;
}

export interface SentMeetingFull {
  uuid: string;
  date: string;
  start_time: string;
  end_time: string;
  status: 'approved' | 'pending' | 'postponed';
  title: string;
  description: string;
  meeting_url: string;
  insighter?: {
    uuid: string;
    name: string;
    profile_photo_url?: string | null;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** Insighter-received client meetings. */
export async function getReceivedMeetings(
  locale: string,
  options: { page?: number; perPage?: number; dateStatus?: 'coming' | 'past'; archived?: boolean } = {}
): Promise<{ data: ReceivedMeeting[]; meta: PaginationMeta }> {
  return apiRequest('/insighter/meeting/list', {
    locale,
    params: {
      page: options.page ?? 1,
      per_page: options.perPage ?? 10,
      date_status: options.archived ? undefined : options.dateStatus,
      archived: options.archived ? 'true' : undefined,
    },
  });
}

/** Client-sent meetings. */
export async function getSentMeetingsList(
  locale: string,
  options: { page?: number; perPage?: number; dateStatus?: 'coming' | 'past'; archived?: boolean } = {}
): Promise<{ data: SentMeetingFull[]; meta: PaginationMeta }> {
  return apiRequest('/account/meeting/client/list', {
    locale,
    params: {
      page: options.page ?? 1,
      per_page: options.perPage ?? 10,
      date_status: options.archived ? undefined : options.dateStatus,
      archived: options.archived ? 'true' : undefined,
    },
  });
}

export async function updateMeetingAction(
  locale: string,
  meetingUuid: string,
  status: 'approved' | 'postponed',
  notes: string
): Promise<void> {
  await apiRequest(`/insighter/meeting/action/${meetingUuid}`, {
    locale,
    method: 'POST',
    body: { status, notes },
  });
}

export async function archiveReceivedMeeting(locale: string, meetingUuid: string): Promise<void> {
  await apiRequest(`/insighter/meeting/archive/${meetingUuid}`, { locale, method: 'POST', body: {} });
}

export async function archiveSentMeeting(locale: string, meetingUuid: string): Promise<void> {
  await apiRequest(`/account/meeting/archive/${meetingUuid}`, { locale, method: 'POST', body: {} });
}
