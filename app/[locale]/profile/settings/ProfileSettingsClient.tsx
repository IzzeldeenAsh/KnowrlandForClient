'use client';

import Link from 'next/link';
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocale } from 'next-intl';
import {
  IconBriefcase,
  IconCamera,
  IconCertificate,
  IconCheck,
  IconChevronRight,
  IconCircleCheck,
  IconEdit,
  IconLoader2,
  IconPlus,
  IconSearch,
  IconTrash,
  IconUpload,
  IconUserCircle,
  IconX,
} from '@tabler/icons-react';
import { getApiUrl } from '@/app/config';
import FacebookSocialIcon from '@/app/components/icons/social/FacebookSocialIcon';
import InstagramSocialIcon from '@/app/components/icons/social/InstagramSocialIcon';
import LinkedinSocialIcon from '@/app/components/icons/social/LinkedinSocialIcon';
import TiktokSocialIcon from '@/app/components/icons/social/TiktokSocialIcon';
import XSocialIcon from '@/app/components/icons/social/XSocialIcon';
import YoutubeSocialIcon from '@/app/components/icons/social/YoutubeSocialIcon';
import NewCertificationIcon from '@/app/components/icons/NewCertificationIcon';
import { Country, useCountries } from '@/app/lib/useCountries';
import { useToast } from '@/components/toast/ToastContext';
import {
  ProfileConsultingField,
  ProfileCertification,
  ProfileSocial,
  ProfileTaxonomy,
  User,
  useUserProfile,
} from '@/components/ui/header/hooks/useUserProfile';
import { getAuthToken } from '@/lib/authToken';

type EditableField =
  | 'photo'
  | 'name'
  | 'country'
  | 'phone'
  | 'language'
  | 'experience'
  | 'bio'
  | 'expertise'
  | 'industries'
  | 'company_legal_name'
  | 'company_website'
  | 'company_country'
  | 'company_address'
  | 'company_phone'
  | 'company_experience'
  | 'company_about'
  | 'company_expertise'
  | 'company_industries'
  | 'company_logo'
  | SocialKey;

type SocialKey = 'linkedin' | 'facebook' | 'x' | 'instagram' | 'youtube' | 'tiktok';

type TreeNode = {
  key: number | string;
  label: string;
  data: {
    key: number | string;
    label?: string;
    nameEn?: string;
    nameAr?: string;
    customInput?: string;
  };
  children: TreeNode[];
  parentKey: number | string | null;
  isCustom?: boolean;
};

type ProfileFormState = {
  first_name: string;
  last_name: string;
  country_id: number | '';
  phone_code: string;
  phone: string;
  language: 'en' | 'ar';
  bio: string;
  experience: string;
  industries: TreeNode[];
  consulting_field: TreeNode[];
  socials: Record<SocialKey, string>;
};

type CompanyFormState = {
  legal_name: string;
  website: string;
  country_id: number | '';
  address: string;
  phone_code: string;
  company_phone: string;
  experience: string;
  about_us: string;
  industries: TreeNode[];
  consulting_field: TreeNode[];
  socials: Record<SocialKey, string>;
};

type TreeListState = {
  industries: TreeNode[];
  consultingFields: TreeNode[];
  loading: boolean;
  error: string | null;
};

type ProfileSettingsSection = 'information' | 'certificates' | 'company-information' | 'company-certificates';

type DocumentTypeOption = {
  id: string;
  name: string;
  names?: {
    en?: string;
    ar?: string;
  };
};

type PhoneMaskConfig = {
  mask: string;
  placeholder: string;
};

const PROFESSIONAL_ROLES = ['insighter', 'company', 'company-insighter'];
const MAX_EXPERIENCE_YEARS = 40;
const PHONE_MASKS: Record<string, PhoneMaskConfig> = {
  default: { mask: '000-000-0000', placeholder: '123-456-7890' },
  '1': { mask: '000-000-0000', placeholder: '123-456-7890' },
  '44': { mask: '0000-000000', placeholder: '1234-567890' },
  '966': { mask: '0-0000-0000', placeholder: '5-1234-5678' },
  '971': { mask: '0-0000-0000', placeholder: '5-1234-5678' },
  '20': { mask: '00-0000-0000', placeholder: '12-3456-7890' },
  '962': { mask: '0-0000-0000', placeholder: '7-1234-5678' },
  '961': { mask: '0-0000-0000', placeholder: '3-1234-5678' },
  '33': { mask: '00-00-00-00-00', placeholder: '12-34-56-78-90' },
  '49': { mask: '0000-0000000', placeholder: '1234-5678901' },
  '39': { mask: '000-0000000', placeholder: '123-4567890' },
};
const CERTIFICATE_ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
const ALLOWED_CERTIFICATE_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
]);
const ALLOWED_CERTIFICATE_EXTENSIONS = new Set(['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']);
const CERTIFICATE_TYPE_FALLBACKS: DocumentTypeOption[] = [
  { id: 'professional_certifications', name: 'Professional Certifications' },
  { id: 'data_project_documentation', name: 'Data Project Documentation' },
  { id: 'portfolio_of_past_projects', name: 'Portfolio of Past Projects' },
  { id: 'letters_of_recommendation', name: 'Letters of Recommendation' },
  { id: 'course_completion_certificate', name: 'Course Completion Certificate' },
  { id: 'degrees_diplomas', name: 'Degrees / Diplomas' },
];
const SOCIAL_FIELDS: Array<{
  key: SocialKey;
  label: string;
  placeholder: string;
  color: string;
}> = [
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/username', color: '#0a66c2' },
    { key: 'x', label: 'X', placeholder: 'https://x.com/username', color: '#111827' },
    { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@channel', color: '#ff0033' },
    { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/username', color: '#1877f2' },
    { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/username', color: '#d946ef' },
    { key: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@username', color: '#111827' },
  ];

const emptySocials: Record<SocialKey, string> = {
  linkedin: '',
  facebook: '',
  x: '',
  instagram: '',
  youtube: '',
  tiktok: '',
};
const ROOT_TREE_CUSTOM_PARENT_KEY = '__root__';

function isProfessionalRole(roles: string[]): boolean {
  return roles.some((role) => PROFESSIONAL_ROLES.includes(role));
}

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value : value == null ? '' : String(value);
}

function normalizeExperienceValue(value: unknown): string {
  const digits = normalizeString(value).replace(/[^\d]/g, '').slice(0, 2);
  if (!digits) return '';

  return String(Math.min(Number(digits), MAX_EXPERIENCE_YEARS));
}

function normalizeTreeKey(value: unknown): string {
  return value == null ? '' : String(value);
}

function getTreeCustomParentSlot(parentKey: number | string | null): string {
  return parentKey == null ? ROOT_TREE_CUSTOM_PARENT_KEY : normalizeTreeKey(parentKey);
}

function getInitials(user: User | null): string {
  const first = user?.first_name?.trim()?.charAt(0) ?? '';
  const last = user?.last_name?.trim()?.charAt(0) ?? '';
  const initials = `${first}${last}`.trim();

  if (initials) return initials.toUpperCase();

  const nameParts = user?.name?.trim().split(/\s+/).filter(Boolean) ?? [];
  return (nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0]?.slice(0, 2) ?? 'U').toUpperCase();
}

function getSocialLink(social: ProfileSocial[] | undefined, key: SocialKey): string {
  const candidates = key === 'x' ? ['x', 'twitter'] : key === 'linkedin' ? ['linkedin', 'linkedIn'] : [key];
  return social?.find((item) => candidates.includes(item.type))?.link ?? '';
}

function taxonomyToTreeNodes(items: ProfileTaxonomy[] | ProfileConsultingField[] | undefined): TreeNode[] {
  return (items ?? []).map((item) => {
    const key = normalizeTreeKey(item.id);
    return {
      key,
      label: item.name,
      data: {
        key,
        label: item.name,
        nameEn: 'names' in item ? item.names?.en ?? item.name : item.name,
        nameAr: 'names' in item ? item.names?.ar ?? item.name : item.name,
      },
      children: [],
      parentKey: null,
    };
  });
}

function buildInitialForm(user: User | null, roles: string[], locale: string): ProfileFormState {
  const socialSource =
    roles.includes('company') && !roles.includes('company-insighter')
      ? user?.company?.social
      : user?.social;
  const industriesSource = user?.industries?.length ? user.industries : user?.company?.industries;
  const consultingFieldSource = user?.consulting_field?.length ? user.consulting_field : user?.company?.consulting_field;

  return {
    first_name: normalizeString(user?.first_name),
    last_name: normalizeString(user?.last_name),
    country_id: typeof user?.country_id === 'number' ? user.country_id : '',
    phone_code: normalizeString(user?.phone_code),
    phone: normalizeString(user?.phone),
    language: user?.language === 'ar' || user?.language === 'en' ? user.language : locale === 'ar' ? 'ar' : 'en',
    bio: normalizeString(user?.bio),
    experience: normalizeExperienceValue(user?.experience),
    industries: taxonomyToTreeNodes(industriesSource),
    consulting_field: taxonomyToTreeNodes(consultingFieldSource),
    socials: {
      linkedin: getSocialLink(socialSource, 'linkedin'),
      facebook: getSocialLink(socialSource, 'facebook'),
      x: getSocialLink(socialSource, 'x'),
      instagram: getSocialLink(socialSource, 'instagram'),
      youtube: getSocialLink(socialSource, 'youtube'),
      tiktok: getSocialLink(socialSource, 'tiktok'),
    },
  };
}

function buildInitialCompanyForm(user: User | null, locale: string): CompanyFormState {
  const company = user?.company;

  return {
    legal_name: normalizeString(company?.legal_name),
    website: normalizeString(company?.website),
    country_id: typeof company?.country?.id === 'number' ? company.country.id : '',
    address: normalizeString(company?.address),
    phone_code: normalizeString(company?.phone_code),
    company_phone: normalizeString(company?.company_phone),
    experience: normalizeExperienceValue(company?.experience),
    about_us: normalizeString(company?.about_us),
    industries: taxonomyToTreeNodes(company?.industries),
    consulting_field: taxonomyToTreeNodes(company?.consulting_field),
    socials: {
      linkedin: getSocialLink(company?.social, 'linkedin'),
      facebook: getSocialLink(company?.social, 'facebook'),
      x: getSocialLink(company?.social, 'x'),
      instagram: getSocialLink(company?.social, 'instagram'),
      youtube: getSocialLink(company?.social, 'youtube'),
      tiktok: getSocialLink(company?.social, 'tiktok'),
    },
  };
}

function findCountry(countries: Country[], countryId: number | ''): Country | undefined {
  if (countryId === '') return undefined;
  return countries.find((country) => country.id === countryId);
}

function getCountryLabel(country: Country | undefined, locale: string): string {
  if (!country) return '';
  return locale === 'ar' ? country.names?.ar ?? country.name : country.names?.en ?? country.name;
}

function getCountryFlagSrc(country: Country | undefined): string | null {
  return country?.flag ? `/images/flags/${country.flag}.svg` : null;
}

function normalizeCountrySearchText(value: string | null | undefined): string {
  return normalizeString(value)
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ');
}

function normalizePhoneCode(value: string | null | undefined): string {
  return normalizeString(value).replace(/[^\d]/g, '');
}

function formatPhoneCode(value: string | null | undefined): string {
  const normalized = normalizePhoneCode(value);
  return normalized ? `+${normalized}` : '';
}

function findCountryByPhoneCode(countries: Country[], phoneCode: string): Country | undefined {
  const normalizedPhoneCode = normalizePhoneCode(phoneCode);
  if (!normalizedPhoneCode) return undefined;
  return countries.find((country) => normalizePhoneCode(country.international_code) === normalizedPhoneCode);
}

function getPhoneMaskConfig(phoneCode: string | null | undefined): PhoneMaskConfig {
  return PHONE_MASKS[normalizePhoneCode(phoneCode)] ?? PHONE_MASKS.default;
}

function getPhoneMaskMaxDigits(phoneCode: string | null | undefined): number {
  return getPhoneMaskConfig(phoneCode).mask.split('').filter((character) => character === '0').length;
}

function formatPhoneWithMask(value: string | null | undefined, phoneCode: string | null | undefined): string {
  const digits = normalizePhoneCode(value).slice(0, getPhoneMaskMaxDigits(phoneCode));
  const mask = getPhoneMaskConfig(phoneCode).mask;
  let formatted = '';
  let digitIndex = 0;

  for (let i = 0; i < mask.length && digitIndex < digits.length; i += 1) {
    if (mask[i] === '0') {
      formatted += digits[digitIndex];
      digitIndex += 1;
    } else if (digitIndex > 0) {
      formatted += mask[i];
    }
  }

  return formatted;
}

function cleanPhoneForCode(value: string, phoneCode: string | null | undefined): string {
  return normalizePhoneCode(value).slice(0, getPhoneMaskMaxDigits(phoneCode));
}

function getLocalizedTreeLabel(node: TreeNode, locale: string): string {
  if (locale === 'ar') return node.data.nameAr ?? node.label;
  return node.data.nameEn ?? node.label;
}

function flattenTree(nodes: TreeNode[]): TreeNode[] {
  return nodes.flatMap((node) => [node, ...flattenTree(node.children)]);
}

function normalizeTreeNodes(rawNodes: unknown, locale: string, parentKey: number | string | null = null): TreeNode[] {
  if (!Array.isArray(rawNodes)) return [];

  return rawNodes.map((raw) => {
    const record = raw as {
      key?: number | string;
      id?: number | string;
      label?: string;
      name?: string;
      names?: { en?: string; ar?: string };
      children?: unknown;
    };
    const key = normalizeTreeKey(record.key ?? record.id ?? '');
    const label =
      (locale === 'ar' ? record.names?.ar : record.names?.en) ??
      record.names?.en ??
      record.label ??
      record.name ??
      String(key);

    return {
      key,
      label,
      data: {
        key,
        label,
        nameEn: record.names?.en ?? record.label ?? record.name ?? String(key),
        nameAr: record.names?.ar ?? record.label ?? record.name ?? String(key),
      },
      children: normalizeTreeNodes(record.children, locale, key),
      parentKey,
    };
  });
}

function filterTree(nodes: TreeNode[], query: string, locale: string): TreeNode[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return nodes;

  return nodes
    .map((node) => {
      const children = filterTree(node.children, query, locale);
      const label = getLocalizedTreeLabel(node, locale).toLowerCase();
      if (label.includes(normalizedQuery) || children.length) {
        return { ...node, children };
      }
      return null;
    })
    .filter((node): node is TreeNode => Boolean(node));
}

function buildTreeCustomInputs(selected: TreeNode[]): Record<string, string> {
  const customInputs: Record<string, string> = {};

  selected.forEach((node) => {
    const value = node.data.customInput?.trim();
    if (!node.isCustom || !value) return;

    customInputs[getTreeCustomParentSlot(node.parentKey)] = value;
  });

  return customInputs;
}

async function parseError(response: Response): Promise<Error> {
  try {
    const payload = await response.json();
    const message =
      payload?.message ??
      (payload?.errors && typeof payload.errors === 'object'
        ? Object.values(payload.errors).flat().filter(Boolean).join(', ')
        : '');
    return new Error(message || `Request failed (${response.status})`);
  } catch {
    return new Error(`Request failed (${response.status})`);
  }
}

function buildProfileFormData(form: ProfileFormState, isProfessional: boolean): FormData {
  const formData = new FormData();

  formData.append('first_name', form.first_name.trim());
  formData.append('last_name', form.last_name.trim());
  formData.append('language', form.language);
  formData.append('phone', form.phone.trim());
  formData.append('phone_code', form.phone_code.trim());

  if (form.country_id !== '') {
    formData.append('country_id', String(form.country_id));
  }

  if (isProfessional) {
    formData.append('bio', form.bio.trim());
    const normalizedExperience = normalizeExperienceValue(form.experience);
    if (normalizedExperience) {
      formData.append('experience', normalizedExperience);
    }

    appendTreeSelection(formData, 'industries', 'suggest_industries', form.industries);
    appendTreeSelection(formData, 'consulting_field', 'suggest_consulting_fields', form.consulting_field);
  }

  return formData;
}

function buildCompanyFormData(form: CompanyFormState): FormData {
  const formData = new FormData();

  formData.append('legal_name', form.legal_name.trim());
  formData.append('website', form.website.trim());
  formData.append('address', form.address.trim());
  formData.append('company_phone', form.company_phone.trim());
  formData.append('phone_code', form.phone_code.trim());

  if (form.country_id !== '') {
    formData.append('country_id', String(form.country_id));
  }

  const normalizedExperience = normalizeExperienceValue(form.experience);
  if (normalizedExperience) {
    formData.append('experience', normalizedExperience);
  }

  formData.append('about_us', form.about_us.trim());
  appendTreeSelection(formData, 'industries', 'suggest_industries', form.industries);
  appendTreeSelection(formData, 'consulting_field', 'suggest_consulting_fields', form.consulting_field);

  return formData;
}

function appendTreeSelection(formData: FormData, fieldName: string, suggestName: string, nodes: TreeNode[]) {
  const regularNodes = nodes.filter((node) => node.data.key !== 'selectAll' && !node.isCustom);
  const customNodes = nodes.filter((node) => node.isCustom && node.data.customInput?.trim());

  regularNodes.forEach((node) => {
    formData.append(`${fieldName}[]`, String(node.data.key));
  });

  customNodes.forEach((node, index) => {
    const parentId = node.parentKey === 'selectAll' || node.parentKey == null ? '0' : String(node.parentKey);
    const value = node.data.customInput?.trim() ?? '';
    formData.append(`${suggestName}[${index}][parent_id]`, parentId);
    formData.append(`${suggestName}[${index}][name][en]`, value);
    formData.append(`${suggestName}[${index}][name][ar]`, value);
  });
}

function buildSocialPayload(socials: Record<SocialKey, string>) {
  return SOCIAL_FIELDS
    .map((field) => ({
      type: field.key,
      link: socials[field.key].trim(),
    }))
    .filter((item) => item.link);
}

function getSocialIcon(type: SocialKey, size = 28): ReactNode {
  switch (type) {
    case 'facebook':
      return <FacebookSocialIcon size={size} />;
    case 'x':
      return <XSocialIcon size={size} />;
    case 'youtube':
      return <YoutubeSocialIcon size={size} />;
    case 'linkedin':
      return <LinkedinSocialIcon size={size} />;
    case 'instagram':
      return <InstagramSocialIcon size={size} />;
    case 'tiktok':
      return <TiktokSocialIcon size={size} />;
    default:
      return null;
  }
}

function normalizeDocumentTypes(rawItems: unknown): DocumentTypeOption[] {
  if (!Array.isArray(rawItems)) return [];

  const documentTypes: DocumentTypeOption[] = [];

  rawItems.forEach((item) => {
    const record = item as {
      id?: string | number;
      name?: string;
      label?: string;
      names?: { en?: string; ar?: string };
    };
    const id = record.id == null ? '' : String(record.id);
    const name = record.name ?? record.label ?? record.names?.en ?? id;

    if (id && name) {
      documentTypes.push(record.names ? { id, name, names: record.names } : { id, name });
    }
  });

  return documentTypes;
}

function prettifyCertificateType(type: string): string {
  return type
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getDocumentTypeLabel(documentTypes: DocumentTypeOption[], type: string, locale: string): string {
  const documentType = documentTypes.find((item) => item.id === type);
  if (!documentType) return prettifyCertificateType(type);
  return locale === 'ar' ? documentType.names?.ar ?? documentType.name : documentType.names?.en ?? documentType.name;
}

function getFileExtension(value: string | undefined | null): string {
  if (!value) return '';

  try {
    const pathname = value.startsWith('http') ? new URL(value).pathname : value;
    const extension = pathname.split('.').pop()?.toLowerCase() ?? '';
    return extension.split(/[?#]/)[0] ?? '';
  } catch {
    return value.split('.').pop()?.toLowerCase().split(/[?#]/)[0] ?? '';
  }
}

function isValidCertificateFile(file: File): boolean {
  const extension = getFileExtension(file.name);
  return ALLOWED_CERTIFICATE_MIME_TYPES.has(file.type) || ALLOWED_CERTIFICATE_EXTENSIONS.has(extension);
}

function formatFileSize(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ProfileSettingsClient({
  section = 'information',
}: {
  section?: ProfileSettingsSection;
}) {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const toast = useToast();
  const { user, roles, isLoading, isAuthResolved, refreshProfile } = useUserProfile();
  const { countries, isLoading: countriesLoading, error: countriesError } = useCountries();
  const effectiveRoles = useMemo(() => (roles.length ? roles : user?.roles ?? []), [roles, user?.roles]);
  const isProfessional = isProfessionalRole(effectiveRoles);
  const hasCompanyRole = effectiveRoles.includes('company');
  const isClientOnly = effectiveRoles.length > 0 && effectiveRoles.every((role) => role === 'client');
  const [form, setForm] = useState<ProfileFormState>(() => buildInitialForm(null, [], locale));
  const [draft, setDraft] = useState<ProfileFormState>(() => buildInitialForm(null, [], locale));
  const [companyForm, setCompanyForm] = useState<CompanyFormState>(() => buildInitialCompanyForm(null, locale));
  const [companyDraft, setCompanyDraft] = useState<CompanyFormState>(() => buildInitialCompanyForm(null, locale));
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [savingField, setSavingField] = useState<EditableField | null>(null);
  const [treeModal, setTreeModal] = useState<'expertise' | 'industries' | 'company-expertise' | 'company-industries' | null>(null);
  const [treeLists, setTreeLists] = useState<TreeListState>({
    industries: [],
    consultingFields: [],
    loading: false,
    error: null,
  });
  const [documentTypes, setDocumentTypes] = useState<DocumentTypeOption[]>(CERTIFICATE_TYPE_FALLBACKS);
  const [documentTypesLoading, setDocumentTypesLoading] = useState(false);
  const [documentTypesError, setDocumentTypesError] = useState<string | null>(null);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [selectedCertificateType, setSelectedCertificateType] = useState('');
  const [selectedCertificateFile, setSelectedCertificateFile] = useState<File | null>(null);
  const [certificateUploading, setCertificateUploading] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState<ProfileCertification | null>(null);
  const [certificateDeletingId, setCertificateDeletingId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const committingFieldRef = useRef<EditableField | null>(null);
  const profileSettingsHref = `/${locale}/profile/settings`;
  const certificatesSettingsHref = `${profileSettingsHref}/certificates`;
  const companySettingsHref = `${profileSettingsHref}/company`;
  const companyCertificatesSettingsHref = `${companySettingsHref}/certificates`;
  const isCertificatesSection = section === 'certificates';
  const isCompanyInfoSection = section === 'company-information';
  const isCompanyCertificatesSection = section === 'company-certificates';
  const isCompanySection = isCompanyInfoSection || isCompanyCertificatesSection;
  const selectedCountry = findCountry(countries, form.country_id);
  const selectedPhoneCodeCountry = findCountryByPhoneCode(countries, form.phone_code);
  const selectedCompanyCountry = findCountry(countries, companyForm.country_id);
  const selectedCompanyPhoneCodeCountry = findCountryByPhoneCode(countries, companyForm.phone_code);

  useEffect(() => {
    if (!user) return;
    const nextForm = buildInitialForm(user, effectiveRoles, locale);
    setForm(nextForm);
    setDraft(nextForm);
    const nextCompanyForm = buildInitialCompanyForm(user, locale);
    setCompanyForm(nextCompanyForm);
    setCompanyDraft(nextCompanyForm);
  }, [effectiveRoles, locale, user]);

  useEffect(() => {
    if (!isProfessional) return;

    let ignore = false;

    async function loadTrees() {
      setTreeLists((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const headers: HeadersInit = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        const token = getAuthToken();
        if (token) headers.Authorization = `Bearer ${token}`;

        const [industriesResponse, consultingResponse] = await Promise.all([
          fetch(getApiUrl('/api/common/setting/industry/tree-list'), { headers }),
          fetch(getApiUrl('/api/common/setting/consulting-field/tree/list'), { headers }),
        ]);

        if (!industriesResponse.ok) throw await parseError(industriesResponse);
        if (!consultingResponse.ok) throw await parseError(consultingResponse);

        const [industriesPayload, consultingPayload] = await Promise.all([
          industriesResponse.json(),
          consultingResponse.json(),
        ]);

        if (ignore) return;

        setTreeLists({
          industries: normalizeTreeNodes(industriesPayload?.data ?? industriesPayload, locale),
          consultingFields: normalizeTreeNodes(consultingPayload?.data ?? consultingPayload, locale),
          loading: false,
          error: null,
        });
      } catch (error) {
        if (ignore) return;
        setTreeLists((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Unable to load lists.',
        }));
      }
    }

    loadTrees();

    return () => {
      ignore = true;
    };
  }, [isProfessional, locale]);

  useEffect(() => {
    if ((!isCertificatesSection && !isCompanyCertificatesSection) || !isAuthResolved || !user?.id) return;

    let ignore = false;

    async function loadDocumentTypes() {
      setDocumentTypesLoading(true);
      setDocumentTypesError(null);

      try {
        const headers: HeadersInit = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        const token = getAuthToken();
        if (token) headers.Authorization = `Bearer ${token}`;

        const response = await fetch(getApiUrl('/api/common/setting/insighter/document-type/list'), { headers });
        if (!response.ok) throw await parseError(response);

        const payload = await response.json();
        if (ignore) return;

        const nextDocumentTypes = normalizeDocumentTypes(payload?.data ?? payload);
        setDocumentTypes(nextDocumentTypes.length ? nextDocumentTypes : CERTIFICATE_TYPE_FALLBACKS);
      } catch (error) {
        if (ignore) return;
        setDocumentTypes(CERTIFICATE_TYPE_FALLBACKS);
        setDocumentTypesError(error instanceof Error ? error.message : 'Unable to load certificate types.');
      } finally {
        if (!ignore) setDocumentTypesLoading(false);
      }
    }

    loadDocumentTypes();

    return () => {
      ignore = true;
    };
  }, [isAuthResolved, isCertificatesSection, isCompanyCertificatesSection, locale, user?.id]);

  const countryLabel = getCountryLabel(findCountry(countries, form.country_id), locale);
  const showProfessionalRows = isProfessional;
  const sidebarTitle = effectiveRoles.includes('company') ? (isRtl ? 'المدير' : 'Manager') : isRtl ? 'شخصي' : 'Personal';
  const certificates = user?.certifications ?? [];
  const companyCertificates = user?.company?.certifications ?? [];
  const companyCountryLabel = getCountryLabel(selectedCompanyCountry, locale);

  function startEdit(field: EditableField) {
    if (savingField) return;
    if (field.startsWith('company_') || (isCompanyInfoSection && SOCIAL_FIELDS.some((item) => item.key === field))) {
      setCompanyDraft(companyForm);
    } else {
      setDraft(form);
    }
    setEditingField(field);
  }

  function cancelEdit() {
    if (isCompanyInfoSection) {
      setCompanyDraft(companyForm);
    } else {
      setDraft(form);
    }
    setEditingField(null);
  }

  function handleBlurOutside(field: EditableField, event: FocusEvent<HTMLElement>) {
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && event.currentTarget.contains(nextTarget)) return;
    void commitDraft(field);
  }

  function handleInputKeyDown(field: EditableField, event: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      cancelEdit();
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      void commitDraft(field);
    }
  }

  function handleTextareaKeyDown(field: EditableField, event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      cancelEdit();
      return;
    }

    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      void commitDraft(field);
    }
  }

  async function commitDraft(field: EditableField) {
    if (committingFieldRef.current === field) return;
    committingFieldRef.current = field;

    const isCompanyField = field.startsWith('company_') || (isCompanyInfoSection && SOCIAL_FIELDS.some((item) => item.key === field));
    const currentForm = isCompanyField ? companyForm : form;
    const currentDraft = isCompanyField ? companyDraft : draft;

    if (JSON.stringify(currentForm) === JSON.stringify(currentDraft)) {
      setEditingField(null);
      committingFieldRef.current = null;
      return;
    }

    setEditingField(null);

    if (isCompanyField) {
      if (SOCIAL_FIELDS.some((item) => item.key === field)) {
        await updateCompanySocialLinks(field, companyDraft.socials);
      } else {
        await updateCompanyProfile(field, companyDraft);
      }
    } else if (SOCIAL_FIELDS.some((item) => item.key === field)) {
      await updateSocialLinks(field, draft.socials);
    } else {
      await updateProfile(field, draft);
    }

    committingFieldRef.current = null;
  }

  async function updateProfile(field: EditableField, nextForm: ProfileFormState) {
    const previous = form;
    const token = getAuthToken();

    if (!token) {
      toast.error(isRtl ? 'يرجى تسجيل الدخول مرة أخرى.' : 'Please sign in again.');
      return;
    }

    setForm(nextForm);
    setSavingField(field);

    try {
      const response = await fetch(getApiUrl('/api/account/profile'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${token}`,
        },
        body: buildProfileFormData(nextForm, isProfessional),
      });

      if (!response.ok) throw await parseError(response);

      await refreshProfile();
      toast.success(isRtl ? 'تم تحديث الملف الشخصي.' : 'Profile updated.');
    } catch (error) {
      setForm(previous);
      setDraft(previous);
      toast.error(error instanceof Error ? error.message : isRtl ? 'تعذر تحديث الملف الشخصي.' : 'Unable to update profile.');
    } finally {
      setSavingField(null);
    }
  }

  async function updateSocialLinks(field: EditableField, socials: Record<SocialKey, string>) {
    const previous = form;
    const token = getAuthToken();

    if (!token) {
      toast.error(isRtl ? 'يرجى تسجيل الدخول مرة أخرى.' : 'Please sign in again.');
      return;
    }

    const nextForm = { ...form, socials };
    const endpoint =
      effectiveRoles.includes('company') && !effectiveRoles.includes('company-insighter')
        ? '/api/company/social'
        : '/api/insighter/social';

    setForm(nextForm);
    setSavingField(field);

    try {
      const response = await fetch(getApiUrl(endpoint), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ social: buildSocialPayload(socials) }),
      });

      if (!response.ok) throw await parseError(response);

      await refreshProfile();
      toast.success(isRtl ? 'تم تحديث روابط التواصل.' : 'Social links updated.');
    } catch (error) {
      setForm(previous);
      setDraft(previous);
      toast.error(error instanceof Error ? error.message : isRtl ? 'تعذر تحديث روابط التواصل.' : 'Unable to update social links.');
    } finally {
      setSavingField(null);
    }
  }

  async function updateCompanyProfile(field: EditableField, nextForm: CompanyFormState) {
    const previous = companyForm;
    const token = getAuthToken();

    if (!token) {
      toast.error(isRtl ? 'يرجى تسجيل الدخول مرة أخرى.' : 'Please sign in again.');
      return;
    }

    setCompanyForm(nextForm);
    setSavingField(field);

    try {
      const response = await fetch(getApiUrl('/api/account/profile/company/info'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${token}`,
        },
        body: buildCompanyFormData(nextForm),
      });

      if (!response.ok) throw await parseError(response);

      await refreshProfile();
      toast.success(isRtl ? 'تم تحديث معلومات الشركة.' : 'Company information updated.');
    } catch (error) {
      setCompanyForm(previous);
      setCompanyDraft(previous);
      toast.error(error instanceof Error ? error.message : isRtl ? 'تعذر تحديث معلومات الشركة.' : 'Unable to update company information.');
    } finally {
      setSavingField(null);
    }
  }

  async function updateCompanySocialLinks(field: EditableField, socials: Record<SocialKey, string>) {
    const previous = companyForm;
    const token = getAuthToken();

    if (!token) {
      toast.error(isRtl ? 'يرجى تسجيل الدخول مرة أخرى.' : 'Please sign in again.');
      return;
    }

    const nextForm = { ...companyForm, socials };
    setCompanyForm(nextForm);
    setSavingField(field);

    try {
      const response = await fetch(getApiUrl('/api/company/social'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ social: buildSocialPayload(socials) }),
      });

      if (!response.ok) throw await parseError(response);

      await refreshProfile();
      toast.success(isRtl ? 'تم تحديث روابط الشركة.' : 'Company social links updated.');
    } catch (error) {
      setCompanyForm(previous);
      setCompanyDraft(previous);
      toast.error(error instanceof Error ? error.message : isRtl ? 'تعذر تحديث روابط الشركة.' : 'Unable to update company social links.');
    } finally {
      setSavingField(null);
    }
  }

  async function handlePhotoSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      toast.error(isRtl ? 'يرجى اختيار صورة PNG أو JPEG.' : 'Please choose a PNG or JPEG image.');
      return;
    }

    const token = getAuthToken();
    if (!token) {
      toast.error(isRtl ? 'يرجى تسجيل الدخول مرة أخرى.' : 'Please sign in again.');
      return;
    }

    const formData = new FormData();
    formData.append('profile_photo', file);
    setSavingField('photo');

    try {
      const response = await fetch(getApiUrl('/api/account/profile/photo'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw await parseError(response);

      await refreshProfile();
      toast.success(isRtl ? 'تم تحديث الصورة الشخصية.' : 'Profile photo updated.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : isRtl ? 'تعذر تحديث الصورة.' : 'Unable to update photo.');
    } finally {
      setSavingField(null);
    }
  }

  async function handleLogoSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      toast.error(isRtl ? 'يرجى اختيار صورة PNG أو JPEG.' : 'Please choose a PNG or JPEG image.');
      return;
    }

    const token = getAuthToken();
    if (!token) {
      toast.error(isRtl ? 'يرجى تسجيل الدخول مرة أخرى.' : 'Please sign in again.');
      return;
    }

    const formData = new FormData();
    formData.append('logo', file);
    setSavingField('company_logo');

    try {
      const response = await fetch(getApiUrl('/api/account/profile/company/logo'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw await parseError(response);

      await refreshProfile();
      toast.success(isRtl ? 'تم تحديث شعار الشركة.' : 'Company logo updated.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : isRtl ? 'تعذر تحديث الشعار.' : 'Unable to update logo.');
    } finally {
      setSavingField(null);
    }
  }

  function updateTreeField(field: 'expertise' | 'industries', selectedNodes: TreeNode[]) {
    const key = field === 'expertise' ? 'consulting_field' : 'industries';
    const nextForm = { ...form, [key]: selectedNodes } as ProfileFormState;
    setDraft(nextForm);
    setTreeModal(null);
    void updateProfile(field, nextForm);
  }

  function updateCompanyTreeField(field: 'expertise' | 'industries', selectedNodes: TreeNode[]) {
    const key = field === 'expertise' ? 'consulting_field' : 'industries';
    const nextForm = { ...companyForm, [key]: selectedNodes } as CompanyFormState;
    setCompanyDraft(nextForm);
    setTreeModal(null);
    void updateCompanyProfile(field === 'expertise' ? 'company_expertise' : 'company_industries', nextForm);
  }

  function openCertificateDialog() {
    setSelectedCertificateType('');
    setSelectedCertificateFile(null);
    setCertificateDialogOpen(true);
  }

  function closeCertificateDialog() {
    if (certificateUploading) return;
    setCertificateDialogOpen(false);
    setSelectedCertificateType('');
    setSelectedCertificateFile(null);
  }

  function handleCertificateFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    event.target.value = '';
    if (!file) return;

    if (!isValidCertificateFile(file)) {
      toast.error(
        isRtl
          ? 'نوع الملف غير صحيح. يرجى رفع PDF أو DOC أو DOCX أو JPG أو PNG فقط.'
          : 'Invalid file type. Please upload PDF, DOC, DOCX, JPG or PNG files only.'
      );
      return;
    }

    setSelectedCertificateFile(file);
  }

  async function uploadCertificate() {
    if (!selectedCertificateType || !selectedCertificateFile) return;

    const token = getAuthToken();
    if (!token) {
      toast.error(isRtl ? 'يرجى تسجيل الدخول مرة أخرى.' : 'Please sign in again.');
      return;
    }

    const formData = new FormData();
    formData.append('certification[0][type]', selectedCertificateType);
    formData.append('certification[0][file]', selectedCertificateFile);

    setCertificateUploading(true);

    try {
      const response = await fetch(getApiUrl('/api/account/profile/certification'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw await parseError(response);

      await refreshProfile();
      setCertificateDialogOpen(false);
      setSelectedCertificateType('');
      setSelectedCertificateFile(null);
      toast.success(isRtl ? 'تم رفع الشهادة.' : 'Certificate uploaded.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : isRtl ? 'تعذر رفع الشهادة.' : 'Unable to upload certificate.');
    } finally {
      setCertificateUploading(false);
    }
  }

  async function uploadCompanyCertificate() {
    if (!selectedCertificateType || !selectedCertificateFile) return;

    const token = getAuthToken();
    if (!token) {
      toast.error(isRtl ? 'يرجى تسجيل الدخول مرة أخرى.' : 'Please sign in again.');
      return;
    }

    const formData = new FormData();
    formData.append('certification[0][type]', selectedCertificateType);
    formData.append('certification[0][file]', selectedCertificateFile);

    setCertificateUploading(true);

    try {
      const response = await fetch(getApiUrl('/api/account/profile/company/certification'), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw await parseError(response);

      await refreshProfile();
      setCertificateDialogOpen(false);
      setSelectedCertificateType('');
      setSelectedCertificateFile(null);
      toast.success(isRtl ? 'تم رفع شهادة الشركة.' : 'Company certificate uploaded.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : isRtl ? 'تعذر رفع شهادة الشركة.' : 'Unable to upload company certificate.');
    } finally {
      setCertificateUploading(false);
    }
  }

  async function deleteCertificate() {
    if (!certificateToDelete) return;

    const token = getAuthToken();
    if (!token) {
      toast.error(isRtl ? 'يرجى تسجيل الدخول مرة أخرى.' : 'Please sign in again.');
      return;
    }

    setCertificateDeletingId(certificateToDelete.id);

    try {
      const response = await fetch(getApiUrl(`/api/account/profile/certification/${certificateToDelete.id}`), {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw await parseError(response);

      await refreshProfile();
      setCertificateToDelete(null);
      toast.success(isRtl ? 'تم حذف الشهادة.' : 'Certificate deleted.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : isRtl ? 'تعذر حذف الشهادة.' : 'Unable to delete certificate.');
    } finally {
      setCertificateDeletingId(null);
    }
  }

  async function deleteCompanyCertificate() {
    if (!certificateToDelete) return;

    const token = getAuthToken();
    if (!token) {
      toast.error(isRtl ? 'يرجى تسجيل الدخول مرة أخرى.' : 'Please sign in again.');
      return;
    }

    setCertificateDeletingId(certificateToDelete.id);

    try {
      const response = await fetch(getApiUrl(`/api/account/profile/company/certification/${certificateToDelete.id}`), {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Accept-Language': locale,
          'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw await parseError(response);

      await refreshProfile();
      setCertificateToDelete(null);
      toast.success(isRtl ? 'تم حذف شهادة الشركة.' : 'Company certificate deleted.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : isRtl ? 'تعذر حذف شهادة الشركة.' : 'Unable to delete company certificate.');
    } finally {
      setCertificateDeletingId(null);
    }
  }

  if (!isAuthResolved || (isLoading && !user)) {
    return <ProfileSettingsSkeleton />;
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <IconUserCircle className="mx-auto mb-4 text-blue-500" size={44} stroke={1.7} />
          <h1 className="text-2xl font-semibold text-slate-950">{isRtl ? 'تسجيل الدخول مطلوب' : 'Sign in required'}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {isRtl ? 'يرجى تسجيل الدخول لتعديل إعدادات الملف الشخصي.' : 'Please sign in to edit your profile settings.'}
          </p>
        </div>
      </main>
    );
  }

  if (isCompanySection && !hasCompanyRole) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <IconBriefcase className="mx-auto mb-4 text-blue-500" size={44} stroke={1.7} />
          <h1 className="text-2xl font-semibold text-slate-950">{isRtl ? 'هذه الصفحة غير متاحة' : 'This page is unavailable'}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {isRtl ? 'إعدادات الشركة متاحة فقط للحسابات التي تملك دور شركة.' : 'Company settings are only available for accounts with the company role.'}
          </p>
        </div>
      </main>
    );
  }

  const pageTitle = isCompanyCertificatesSection
    ? isRtl
      ? 'شهادات الشركة'
      : 'Company Certificates'
    : isCompanyInfoSection
      ? isRtl
        ? 'معلومات الشركة'
        : 'Company Information'
      : isCertificatesSection
        ? isRtl
          ? 'شهاداتي'
          : 'My Certificates'
        : isRtl
          ? 'إعدادات الملف الشخصي'
          : 'Profile Settings';
  const pageDescription = isCompanyCertificatesSection
    ? isRtl
      ? 'أدر شهادات وملفات الشركة التي تدعم ملف الشركة.'
      : 'Manage company certificates and supporting files.'
    : isCompanyInfoSection
      ? isRtl
        ? 'عدّل معلومات الشركة التي تظهر في صفحة الشركة.'
        : 'Edit the company information shown on your company profile.'
      : isCertificatesSection
        ? isRtl
          ? 'أدر الشهادات والملفات التي تدعم ملفك الشخصي.'
          : 'Manage the certificates and files that support your profile.'
        : isRtl
          ? 'عدّل كل حقل بشكل مستقل. يتم إرسال التغييرات مباشرة عند التأكيد.'
          : 'Edit each field independently. Changes are sent immediately after confirming the field.';
  const badgeVerified = isCompanySection ? user.company?.verified : user.verified;

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <Link href={`/${locale}`} className="hover:text-blue-600">
                {isRtl ? 'الرئيسية' : 'Home'}
              </Link>
              <IconChevronRight size={14} className={isRtl ? 'rotate-180' : ''} />
              <span>{isRtl ? 'إعدادات الملف الشخصي' : 'Profile settings'}</span>
            </div>
            <h1 className="mt-8 text-2xl font-semibold tracking-tight text-slate-950">
              {pageTitle}
            </h1>
            <p className="mt-1 text-sm text-slate-500">{pageDescription}</p>
          </div>
          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {badgeVerified ? (isRtl ? 'حساب موثق' : 'Verified account') : isRtl ? 'الحساب غير موثق' : 'Unverified account'}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            <div className="overflow-hidden rounded-xl border border-[#cfdbeb] bg-white shadow-sm">
              <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="text-md font-semibold tracking-tight text-slate-800">{sidebarTitle}</h2>
              </div>

              <nav>
                <SidebarItem active={!isCertificatesSection && !isCompanySection} href={profileSettingsHref} icon={<IconUserCircle size={16} stroke={1.7} />}>
                  <div className="text-[12px]">{isRtl ? 'معلوماتي' : 'My Information'}</div>
                </SidebarItem>
                {!isClientOnly && (
                  <SidebarItem active={isCertificatesSection} href={certificatesSettingsHref} icon={<IconCertificate size={16} stroke={1.7} />}>
                    <div className="text-[12px]">{isRtl ? 'شهاداتي' : 'My Certificates'}</div>
                  </SidebarItem>
                )}
              </nav>
            </div>

            {hasCompanyRole && (
              <div className="overflow-hidden rounded-xl border border-[#cfdbeb] bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-4">
                  <h2 className="text-md font-semibold tracking-tight text-slate-800">{isRtl ? 'الشركة' : 'Company'}</h2>
                </div>

                <nav>
                  <SidebarItem active={isCompanyInfoSection} href={companySettingsHref} icon={<IconBriefcase size={16} stroke={1.7} />}>
                    <div className="text-[12px]">{isRtl ? 'معلومات الشركة' : 'Company Information'}</div>
                  </SidebarItem>
                  <SidebarItem active={isCompanyCertificatesSection} href={companyCertificatesSettingsHref} icon={<IconCertificate size={16} stroke={1.7} />}>
                    <div className="text-[12px]">{isRtl ? 'شهادات الشركة' : 'Company Certificates'}</div>
                  </SidebarItem>
                </nav>
              </div>
            )}
          </aside>

          <section className="space-y-5">
            {!isCertificatesSection && !isCompanySection && (
              <>
                <div className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 px-5 py-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <SectionTitle
                        icon={<IconUserCircle size={20} stroke={1.8} />}
                        title={isRtl ? 'معلوماتي' : 'My Information'}
                        description={isRtl ? 'المعلومات الأساسية التي تظهر في ملفك الشخصي.' : 'Core information shown on your profile.'}
                      />
                      {savingField && (
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          <IconLoader2 size={14} className="animate-spin" />
                          {isRtl ? 'جار التحديث' : 'Updating'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    <ProfileRow
                      label={isRtl ? 'الصورة' : 'Photo'}
                      value={
                        <div className="flex items-center  gap-4">
                          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-emerald-400 bg-slate-100">
                            {user.profile_photo_url ? (
                              <img src={user.profile_photo_url} alt={user.name} className="h-full w-full object-cover object-top" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-blue-600">
                                {getInitials(user)}
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="absolute inset-x-0 bottom-0 flex h-6 items-center justify-center bg-slate-950/55 text-white"
                              aria-label={isRtl ? 'تغيير الصورة' : 'Change photo'}
                            >
                              <IconCamera size={16} />
                            </button>
                          </div>
                          <span className="text-slate-500">150x150px JPEG, PNG Image</span>

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg"
                            className="hidden"
                            onChange={handlePhotoSelected}
                          />
                        </div>
                      }
                      isSaving={savingField === 'photo'}
                      onEdit={() => fileInputRef.current?.click()}
                    />

                    <ProfileRow
                      label={isRtl ? 'الاسم' : 'Name'}
                      value={`${form.first_name} ${form.last_name}`.trim() || '-'}
                      isEditing={editingField === 'name'}
                      isSaving={savingField === 'name'}
                      onEdit={() => startEdit('name')}
                      onCancel={cancelEdit}
                      onSave={() => void commitDraft('name')}
                      onBlurCapture={(event) => handleBlurOutside('name', event)}
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        <TextInput
                          value={draft.first_name}
                          placeholder={isRtl ? 'الاسم الأول' : 'First name'}
                          autoFocus
                          onChange={(value) => setDraft((prev) => ({ ...prev, first_name: value }))}
                          onKeyDown={(event) => handleInputKeyDown('name', event)}
                        />
                        <TextInput
                          value={draft.last_name}
                          placeholder={isRtl ? 'اسم العائلة' : 'Last name'}
                          onChange={(value) => setDraft((prev) => ({ ...prev, last_name: value }))}
                          onKeyDown={(event) => handleInputKeyDown('name', event)}
                        />
                      </div>
                    </ProfileRow>

                    <ProfileRow label={isRtl ? 'البريد الإلكتروني' : 'Email'} value={user.email || '-'} readOnly />

                    <ProfileRow
                      label={isRtl ? 'الدولة' : 'Country'}
                      value={
                        <CountryInlineValue
                          country={selectedCountry}
                          locale={locale}
                          fallback={countryLabel || user.country || '-'}
                        />
                      }
                      isEditing={editingField === 'country'}
                      isSaving={savingField === 'country'}
                      onEdit={() => startEdit('country')}
                      onCancel={cancelEdit}
                      onSave={() => void commitDraft('country')}
                      onBlurCapture={(event) => handleBlurOutside('country', event)}
                    >
                      <SearchableCountrySelect
                        countries={countries}
                        locale={locale}
                        value={draft.country_id}
                        loading={countriesLoading}
                        placeholder={isRtl ? 'اختر الدولة' : 'Select country'}
                        searchPlaceholder={isRtl ? 'ابحث عن دولة...' : 'Search country...'}
                        onSelect={(country) => setDraft((prev) => ({ ...prev, country_id: country.id }))}
                      />
                      {countriesError && <p className="mt-2 text-xs text-rose-600">{countriesError}</p>}
                    </ProfileRow>

                    <ProfileRow
                      label={isRtl ? 'الهاتف' : 'Phone'}
                      value={
                        form.phone ? (
                          <PhoneInlineValue country={selectedPhoneCodeCountry} code={form.phone_code} phone={form.phone} />
                        ) : isRtl ? (
                          'لم يتم إضافة رقم هاتف'
                        ) : (
                          'No phone number yet'
                        )
                      }
                      isEditing={editingField === 'phone'}
                      isSaving={savingField === 'phone'}
                      onEdit={() => startEdit('phone')}
                      onCancel={cancelEdit}
                      onSave={() => void commitDraft('phone')}
                      onBlurCapture={(event) => handleBlurOutside('phone', event)}
                    >
                      <div className="grid gap-3 sm:grid-cols-[190px_minmax(0,1fr)]">
                        <SearchableCountrySelect
                          countries={countries}
                          locale={locale}
                          value={draft.phone_code}
                          mode="phoneCode"
                          loading={countriesLoading}
                          placeholder={isRtl ? 'رمز الدولة' : 'Country code'}
                          searchPlaceholder={isRtl ? 'ابحث بالبلد أو الرمز...' : 'Search country or code...'}
                          onSelect={(country) =>
                            setDraft((prev) => ({
                              ...prev,
                              phone_code: normalizePhoneCode(country.international_code),
                            }))
                          }
                        />
                        <MaskedPhoneInput
                          value={draft.phone}
                          phoneCode={draft.phone_code}
                          onChange={(value) => setDraft((prev) => ({ ...prev, phone: value }))}
                          onKeyDown={(event) => handleInputKeyDown('phone', event)}
                        />
                      </div>
                    </ProfileRow>

                    <ProfileRow
                      label={isRtl ? 'لغة الايميلات والإشعارات' : 'Language of emails and notifications'}
                      value={form.language === 'ar' ? (isRtl ? 'العربية' : 'Arabic') : isRtl ? 'الإنجليزية' : 'English'}
                      isEditing={editingField === 'language'}
                      isSaving={savingField === 'language'}
                      onEdit={() => startEdit('language')}
                      onCancel={cancelEdit}
                      onSave={() => void commitDraft('language')}
                    >
                      <div className="flex flex-wrap gap-2">
                        {(['en', 'ar'] as const).map((value) => (
                          <button
                            type="button"
                            key={value}
                            onClick={() => {
                              const next = { ...draft, language: value };
                              setDraft(next);
                            }}
                            className={[
                              'rounded-full border px-4 py-2 text-sm font-semibold transition',
                              draft.language === value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200',
                            ].join(' ')}
                          >
                            {value === 'ar' ? (isRtl ? 'العربية' : 'Arabic') : isRtl ? 'الإنجليزية' : 'English'}
                          </button>
                        ))}
                      </div>
                    </ProfileRow>
                  </div>
                </div>

                {showProfessionalRows && (
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-5 py-5">
                      <SectionTitle
                        icon={<IconBriefcase size={20} stroke={1.8} />}
                        title={isRtl ? 'المعلومات المهنية' : 'Professional Information'}
                        description={isRtl ? 'التخصصات والمجالات التي تظهر في صفحتك كمحترف.' : 'Expertise and specialties shown on your professional page.'}
                      />
                    </div>

                    <div className="divide-y divide-slate-100">
                      <ProfileRow
                        label={isRtl ? 'الخبرات' : 'Expertise'}
                        value={<ChipList items={form.consulting_field} locale={locale} empty={isRtl ? 'لا توجد خبرات بعد' : 'No expertise yet'} />}
                        isSaving={savingField === 'expertise'}
                        onEdit={() => setTreeModal('expertise')}
                      />
                      <ProfileRow
                        label={isRtl ? 'التخصصات (المجالات)' : 'Specialties (Industries)'}
                        value={<ChipList items={form.industries} locale={locale} empty={isRtl ? 'لا توجد مجالات بعد' : 'No industries yet'} />}
                        isSaving={savingField === 'industries'}
                        onEdit={() => setTreeModal('industries')}
                      />
                      {/* <ProfileRow
                        label={isRtl ? 'سنوات الخبرة' : 'Years of Experience'}
                        value={form.experience ? `${form.experience} ${isRtl ? 'سنة' : 'years'}` : '-'}
                        isEditing={editingField === 'experience'}
                        isSaving={savingField === 'experience'}
                        onEdit={() => startEdit('experience')}
                        onCancel={cancelEdit}
                        onSave={() => void commitDraft('experience')}
                        onBlurCapture={(event) => handleBlurOutside('experience', event)}
                      >
                        <TextInput
                          value={draft.experience}
                          type="number"
                          min={0}
                          max={MAX_EXPERIENCE_YEARS}
                          inputMode="numeric"
                          placeholder="0"
                          autoFocus
                          onChange={(value) => setDraft((prev) => ({ ...prev, experience: normalizeExperienceValue(value) }))}
                          onKeyDown={(event) => handleInputKeyDown('experience', event)}
                        />
                        <p className="mt-2 text-xs text-slate-400">
                          {isRtl ? `الحد الأقصى ${MAX_EXPERIENCE_YEARS} سنة.` : `Maximum ${MAX_EXPERIENCE_YEARS} years allowed.`}
                        </p>
                      </ProfileRow> */}
                      <ProfileRow
                        label={isRtl ? 'نبذة' : 'Bio'}
                        value={form.bio || '-'}
                        isEditing={editingField === 'bio'}
                        isSaving={savingField === 'bio'}
                        onEdit={() => startEdit('bio')}
                        onCancel={cancelEdit}
                        onSave={() => void commitDraft('bio')}
                        onBlurCapture={(event) => handleBlurOutside('bio', event)}
                      >
                        <textarea
                          value={draft.bio}
                          autoFocus
                          placeholder={isRtl ? 'اكتب نبذة قصيرة عنك' : 'Write a short bio'}
                          rows={5}
                          onChange={(event) => setDraft((prev) => ({ ...prev, bio: event.target.value }))}
                          onKeyDown={(event) => handleTextareaKeyDown('bio', event)}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        />
                        <p className="mt-2 text-xs text-slate-400">
                          {isRtl ? 'اضغط Ctrl + Enter للتحديث.' : 'Press Ctrl + Enter to update.'}
                        </p>
                      </ProfileRow>
                    </div>
                  </div>
                )}

                {showProfessionalRows && (
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-5 py-5">
                      <SectionTitle
                        icon={<IconCircleCheck size={20} stroke={1.8} />}
                        title={isRtl ? 'روابط التواصل' : 'Social Links'}
                        description={isRtl ? 'روابط حساباتك المهنية.' : 'Your professional social profile links.'}
                      />
                    </div>

                    <div className="divide-y divide-slate-100">
                      {SOCIAL_FIELDS.map((social) => (
                        <ProfileRow
                          key={social.key}
                          label={social.label}
                          value={form.socials[social.key] || '-'}
                          isEditing={editingField === social.key}
                          isSaving={savingField === social.key}
                          onEdit={() => startEdit(social.key)}
                          onCancel={cancelEdit}
                          onSave={() => void commitDraft(social.key)}
                          onBlurCapture={(event) => handleBlurOutside(social.key, event)}
                          icon={<SocialRowIcon type={social.key} />}
                        >
                          <TextInput
                            value={draft.socials[social.key]}
                            placeholder={social.placeholder}
                            autoFocus
                            onChange={(value) =>
                              setDraft((prev) => ({
                                ...prev,
                                socials: { ...prev.socials, [social.key]: value },
                              }))
                            }
                            onKeyDown={(event) => handleInputKeyDown(social.key, event)}
                          />
                        </ProfileRow>
                      ))}
                    </div>
                  </div>
                )}

              </>
            )}

            {isCompanyInfoSection && (
              <>
                <div className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 px-5 py-5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <SectionTitle
                        icon={<IconBriefcase size={20} stroke={1.8} />}
                        title={isRtl ? 'معلومات الشركة' : 'Company Information'}
                        description={isRtl ? 'المعلومات الأساسية التي تظهر في صفحة الشركة.' : 'Core information shown on your company profile.'}
                      />
                      {savingField && (
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          <IconLoader2 size={14} className="animate-spin" />
                          {isRtl ? 'جار التحديث' : 'Updating'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100">
                    <ProfileRow
                      label={isRtl ? 'الشعار' : 'Logo'}
                      value={
                        <div className="flex items-center gap-4">
                          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-blue-400 bg-slate-100">
                            {user.company?.logo ? (
                              <img src={user.company.logo} alt={companyForm.legal_name || 'Company logo'} className="h-full w-full object-contain" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-blue-600">
                                <IconBriefcase size={28} stroke={1.5} />
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => logoInputRef.current?.click()}
                              className="absolute inset-x-0 bottom-0 flex h-6 items-center justify-center bg-slate-950/55 text-white"
                              aria-label={isRtl ? 'تغيير الشعار' : 'Change logo'}
                            >
                              <IconCamera size={16} />
                            </button>
                          </div>
                          <span className="text-slate-500">150x150px JPEG, PNG Image</span>

                          <input
                            ref={logoInputRef}
                            type="file"
                            accept="image/png,image/jpeg"
                            className="hidden"
                            onChange={handleLogoSelected}
                          />
                        </div>
                      }
                      isSaving={savingField === 'company_logo'}
                      onEdit={() => logoInputRef.current?.click()}
                    />

                    <ProfileRow
                      label={isRtl ? 'الاسم القانوني للشركة' : 'Company Legal Name'}
                      value={companyForm.legal_name || '-'}
                      isEditing={editingField === 'company_legal_name'}
                      isSaving={savingField === 'company_legal_name'}
                      onEdit={() => startEdit('company_legal_name')}
                      onCancel={cancelEdit}
                      onSave={() => void commitDraft('company_legal_name')}
                      onBlurCapture={(event) => handleBlurOutside('company_legal_name', event)}
                    >
                      <TextInput
                        value={companyDraft.legal_name}
                        placeholder={isRtl ? 'اسم الشركة القانوني' : 'Company legal name'}
                        autoFocus
                        onChange={(value) => setCompanyDraft((prev) => ({ ...prev, legal_name: value }))}
                        onKeyDown={(event) => handleInputKeyDown('company_legal_name', event)}
                      />
                    </ProfileRow>

                    <ProfileRow
                      label={isRtl ? 'الموقع الإلكتروني' : 'Website'}
                      value={companyForm.website || '-'}
                      isEditing={editingField === 'company_website'}
                      isSaving={savingField === 'company_website'}
                      onEdit={() => startEdit('company_website')}
                      onCancel={cancelEdit}
                      onSave={() => void commitDraft('company_website')}
                      onBlurCapture={(event) => handleBlurOutside('company_website', event)}
                    >
                      <TextInput
                        value={companyDraft.website}
                        placeholder={isRtl ? 'example.com' : 'example.com'}
                        type="url"
                        inputMode="url"
                        autoFocus
                        onChange={(value) => setCompanyDraft((prev) => ({ ...prev, website: value }))}
                        onKeyDown={(event) => handleInputKeyDown('company_website', event)}
                      />
                    </ProfileRow>

                    <ProfileRow
                      label={isRtl ? 'العنوان' : 'Company Address'}
                      value={companyForm.address || '-'}
                      isEditing={editingField === 'company_address'}
                      isSaving={savingField === 'company_address'}
                      onEdit={() => startEdit('company_address')}
                      onCancel={cancelEdit}
                      onSave={() => void commitDraft('company_address')}
                      onBlurCapture={(event) => handleBlurOutside('company_address', event)}
                    >
                      <TextInput
                        value={companyDraft.address}
                        placeholder={isRtl ? 'عنوان الشركة' : 'Company address'}
                        autoFocus
                        onChange={(value) => setCompanyDraft((prev) => ({ ...prev, address: value }))}
                        onKeyDown={(event) => handleInputKeyDown('company_address', event)}
                      />
                    </ProfileRow>

                    <ProfileRow
                      label={isRtl ? 'الدولة' : 'Country'}
                      value={
                        <CountryInlineValue
                          country={selectedCompanyCountry}
                          locale={locale}
                          fallback={companyCountryLabel || user.company?.country?.name || '-'}
                        />
                      }
                      isEditing={editingField === 'company_country'}
                      isSaving={savingField === 'company_country'}
                      onEdit={() => startEdit('company_country')}
                      onCancel={cancelEdit}
                      onSave={() => void commitDraft('company_country')}
                      onBlurCapture={(event) => handleBlurOutside('company_country', event)}
                    >
                      <SearchableCountrySelect
                        countries={countries}
                        locale={locale}
                        value={companyDraft.country_id}
                        loading={countriesLoading}
                        placeholder={isRtl ? 'اختر الدولة' : 'Select country'}
                        searchPlaceholder={isRtl ? 'ابحث عن دولة...' : 'Search country...'}
                        onSelect={(country) => setCompanyDraft((prev) => ({ ...prev, country_id: country.id }))}
                      />
                      {countriesError && <p className="mt-2 text-xs text-rose-600">{countriesError}</p>}
                    </ProfileRow>

                    <ProfileRow
                      label={isRtl ? 'رقم هاتف الشركة' : 'Company Phone Number'}
                      value={
                        companyForm.company_phone ? (
                          <PhoneInlineValue country={selectedCompanyPhoneCodeCountry} code={companyForm.phone_code} phone={companyForm.company_phone} />
                        ) : isRtl ? (
                          'لم يتم إضافة رقم هاتف للشركة'
                        ) : (
                          'No company phone number yet'
                        )
                      }
                      isEditing={editingField === 'company_phone'}
                      isSaving={savingField === 'company_phone'}
                      onEdit={() => startEdit('company_phone')}
                      onCancel={cancelEdit}
                      onSave={() => void commitDraft('company_phone')}
                      onBlurCapture={(event) => handleBlurOutside('company_phone', event)}
                    >
                      <div className="grid gap-3 sm:grid-cols-[190px_minmax(0,1fr)]">
                        <SearchableCountrySelect
                          countries={countries}
                          locale={locale}
                          value={companyDraft.phone_code}
                          mode="phoneCode"
                          loading={countriesLoading}
                          placeholder={isRtl ? 'رمز الدولة' : 'Country code'}
                          searchPlaceholder={isRtl ? 'ابحث بالبلد أو الرمز...' : 'Search country or code...'}
                          onSelect={(country) =>
                            setCompanyDraft((prev) => ({
                              ...prev,
                              phone_code: normalizePhoneCode(country.international_code),
                            }))
                          }
                        />
                        <MaskedPhoneInput
                          value={companyDraft.company_phone}
                          phoneCode={companyDraft.phone_code}
                          onChange={(value) => setCompanyDraft((prev) => ({ ...prev, company_phone: value }))}
                          onKeyDown={(event) => handleInputKeyDown('company_phone', event)}
                        />
                      </div>
                    </ProfileRow>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 px-5 py-5">
                    <SectionTitle
                      icon={<IconCircleCheck size={20} stroke={1.8} />}
                      title={isRtl ? 'الملف المهني للشركة' : 'Company Profile'}
                      description={isRtl ? 'التخصصات، الخبرة، والوصف الذي يظهر على صفحة الشركة.' : 'Expertise, industry specialties, and company description shown on the company page.'}
                    />
                  </div>

                  <div className="divide-y divide-slate-100">
                    <ProfileRow
                      label={isRtl ? 'الخبرات' : 'Expertise'}
                      value={<ChipList items={companyForm.consulting_field} locale={locale} empty={isRtl ? 'لا توجد خبرات بعد' : 'No expertise yet'} />}
                      isSaving={savingField === 'company_expertise'}
                      onEdit={() => setTreeModal('company-expertise')}
                    />
                    <ProfileRow
                      label={isRtl ? 'التخصصات (المجالات)' : 'Specialties (Industries)'}
                      value={<ChipList items={companyForm.industries} locale={locale} empty={isRtl ? 'لا توجد مجالات بعد' : 'No industries yet'} />}
                      isSaving={savingField === 'company_industries'}
                      onEdit={() => setTreeModal('company-industries')}
                    />
                    <ProfileRow
                      label={isRtl ? 'سنوات الخبرة' : 'Years of Experience'}
                      value={companyForm.experience ? `${companyForm.experience} ${isRtl ? 'سنة' : 'years'}` : '-'}
                      isEditing={editingField === 'company_experience'}
                      isSaving={savingField === 'company_experience'}
                      onEdit={() => startEdit('company_experience')}
                      onCancel={cancelEdit}
                      onSave={() => void commitDraft('company_experience')}
                      onBlurCapture={(event) => handleBlurOutside('company_experience', event)}
                    >
                      <TextInput
                        value={companyDraft.experience}
                        type="number"
                        min={0}
                        max={MAX_EXPERIENCE_YEARS}
                        inputMode="numeric"
                        placeholder="0"
                        autoFocus
                        onChange={(value) => setCompanyDraft((prev) => ({ ...prev, experience: normalizeExperienceValue(value) }))}
                        onKeyDown={(event) => handleInputKeyDown('company_experience', event)}
                      />
                      <p className="mt-2 text-xs text-slate-400">
                        {isRtl ? `الحد الأقصى ${MAX_EXPERIENCE_YEARS} سنة.` : `Maximum ${MAX_EXPERIENCE_YEARS} years allowed.`}
                      </p>
                    </ProfileRow>
                    <ProfileRow
                      label={isRtl ? 'نبذة عن الشركة' : 'About Company'}
                      value={companyForm.about_us || '-'}
                      isEditing={editingField === 'company_about'}
                      isSaving={savingField === 'company_about'}
                      onEdit={() => startEdit('company_about')}
                      onCancel={cancelEdit}
                      onSave={() => void commitDraft('company_about')}
                      onBlurCapture={(event) => handleBlurOutside('company_about', event)}
                    >
                      <textarea
                        value={companyDraft.about_us}
                        autoFocus
                        placeholder={isRtl ? 'اكتب نبذة عن الشركة' : 'Write a short company description'}
                        rows={5}
                        onChange={(event) => setCompanyDraft((prev) => ({ ...prev, about_us: event.target.value }))}
                        onKeyDown={(event) => handleTextareaKeyDown('company_about', event)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      />
                      <p className="mt-2 text-xs text-slate-400">
                        {isRtl ? 'اضغط Ctrl + Enter للتحديث.' : 'Press Ctrl + Enter to update.'}
                      </p>
                    </ProfileRow>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-100 px-5 py-5">
                    <SectionTitle
                      icon={<IconCircleCheck size={20} stroke={1.8} />}
                      title={isRtl ? 'روابط التواصل الاجتماعي' : 'Social Media Links'}
                      description={isRtl ? 'روابط حسابات الشركة الاجتماعية والمهنية.' : 'Your company social and professional profile links.'}
                    />
                  </div>

                  <div className="divide-y divide-slate-100">
                    {SOCIAL_FIELDS.map((social) => (
                      <ProfileRow
                        key={`company-${social.key}`}
                        label={social.label}
                        value={companyForm.socials[social.key] || '-'}
                        isEditing={editingField === social.key}
                        isSaving={savingField === social.key}
                        onEdit={() => startEdit(social.key)}
                        onCancel={cancelEdit}
                        onSave={() => void commitDraft(social.key)}
                        onBlurCapture={(event) => handleBlurOutside(social.key, event)}
                        icon={<SocialRowIcon type={social.key} />}
                      >
                        <TextInput
                          value={companyDraft.socials[social.key]}
                          placeholder={social.placeholder}
                          autoFocus
                          onChange={(value) =>
                            setCompanyDraft((prev) => ({
                              ...prev,
                              socials: { ...prev.socials, [social.key]: value },
                            }))
                          }
                          onKeyDown={(event) => handleInputKeyDown(social.key, event)}
                        />
                      </ProfileRow>
                    ))}
                  </div>
                </div>
              </>
            )}

            {(isCertificatesSection || isCompanyCertificatesSection) && (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <SectionTitle
                      icon={<IconCertificate size={20} stroke={1.8} />}
                      title={isCompanyCertificatesSection ? (isRtl ? 'شهادات الشركة' : 'Company Certificates') : isRtl ? 'شهاداتي' : 'My Certificates'}
                      description={
                        isCompanyCertificatesSection
                          ? isRtl
                            ? 'ارفع الشهادات والملفات التي تدعم ملف الشركة.'
                            : 'Upload certificates and files that support your company profile.'
                          : isRtl
                            ? 'ارفع الشهادات والملفات التي تدعم خبرتك.'
                            : 'Upload certificates and files that support your profile.'
                      }
                    />
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        {(isCompanyCertificatesSection ? companyCertificates.length : certificates.length)}{' '}
                        {isRtl ? 'ملف' : (isCompanyCertificatesSection ? companyCertificates.length : certificates.length) === 1 ? 'file' : 'files'}
                      </span>
                      <button
                        type="button"
                        onClick={openCertificateDialog}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        <IconPlus size={17} />
                        {isRtl ? 'إضافة' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>

                {documentTypesError && (
                  <div className="border-b border-amber-100 bg-amber-50 px-5 py-2.5 text-xs font-medium text-amber-700">
                    {isRtl ? 'تعذر تحميل أنواع الشهادات، سيتم استخدام الأنواع الافتراضية.' : 'Unable to load certificate types. Default types are being used.'}
                  </div>
                )}

                <div className="p-5">
                  {documentTypesLoading ? (
                    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm font-medium text-slate-500">
                      <IconLoader2 size={18} className="animate-spin text-blue-500" />
                      {isRtl ? 'جار تحميل الشهادات...' : 'Loading certificates...'}
                    </div>
                  ) : (isCompanyCertificatesSection ? companyCertificates.length : certificates.length) ? (
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {(isCompanyCertificatesSection ? companyCertificates : certificates).map((certificate) => (
                        <CertificateCard
                          key={certificate.id}
                          certificate={certificate}
                          typeLabel={getDocumentTypeLabel(documentTypes, certificate.type, locale)}
                          locale={locale}
                          deleting={certificateDeletingId === certificate.id}
                          onDelete={() => setCertificateToDelete(certificate)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <IconCertificate size={28} stroke={1.8} />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-slate-950">
                        {isCompanyCertificatesSection
                          ? isRtl
                            ? 'لا توجد شهادات شركة بعد'
                            : 'No company certificates yet'
                          : isRtl
                            ? 'لا توجد شهادات بعد'
                            : 'No certificates yet'}
                      </h3>
                      <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                        {isCompanyCertificatesSection
                          ? isRtl
                            ? 'أضف شهادات الشركة، الاعتمادات، أو المستندات الداعمة.'
                            : 'Add company certifications, accreditations, or supporting documents.'
                          : isRtl
                            ? 'أضف ملفات الشهادات المهنية، الدبلومات، أو نماذج الأعمال السابقة.'
                            : 'Add professional certifications, diplomas, or past project files.'}
                      </p>
                      <button
                        type="button"
                        onClick={openCertificateDialog}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        <IconPlus size={17} />
                        {isRtl ? 'إضافة شهادة' : 'Add Certificate'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {treeModal === 'expertise' && (
        <TreeSelectorModal
          title={isRtl ? 'الخبرات' : 'Expertise'}
          subtitle={
            isRtl
              ? 'اختر الخبرات التي تنتمي إليها أو أضف خيارًا آخر ضمن القسم المناسب.'
              : 'Choose the expertise you belong to or add another option under the right group.'
          }
          locale={locale}
          loading={treeLists.loading}
          error={treeLists.error}
          nodes={treeLists.consultingFields}
          selected={form.consulting_field}
          onClose={() => setTreeModal(null)}
          onApply={(selected) => updateTreeField('expertise', selected)}
        />
      )}

      {treeModal === 'industries' && (
        <TreeSelectorModal
          title={isRtl ? 'التخصصات (المجالات)' : 'Specialties (Industries)'}
          subtitle={
            isRtl
              ? 'اختر المجالات التي تنتمي إليها أو أضف خيارًا آخر ضمن القسم المناسب.'
              : 'Choose the industries you belong to or add another option under the right group.'
          }
          locale={locale}
          loading={treeLists.loading}
          error={treeLists.error}
          nodes={treeLists.industries}
          selected={form.industries}
          onClose={() => setTreeModal(null)}
          onApply={(selected) => updateTreeField('industries', selected)}
        />
      )}

      {treeModal === 'company-expertise' && (
        <TreeSelectorModal
          title={isRtl ? 'خبرات الشركة' : 'Company Expertise'}
          subtitle={
            isRtl
              ? 'اختر خبرات الشركة أو أضف خيارًا آخر ضمن القسم المناسب.'
              : 'Choose the company expertise or add another option under the right group.'
          }
          locale={locale}
          loading={treeLists.loading}
          error={treeLists.error}
          nodes={treeLists.consultingFields}
          selected={companyForm.consulting_field}
          onClose={() => setTreeModal(null)}
          onApply={(selected) => updateCompanyTreeField('expertise', selected)}
        />
      )}

      {treeModal === 'company-industries' && (
        <TreeSelectorModal
          title={isRtl ? 'تخصصات الشركة (المجالات)' : 'Company Specialties (Industries)'}
          subtitle={
            isRtl
              ? 'اختر مجالات الشركة أو أضف خيارًا آخر ضمن القسم المناسب.'
              : 'Choose the company industries or add another option under the right group.'
          }
          locale={locale}
          loading={treeLists.loading}
          error={treeLists.error}
          nodes={treeLists.industries}
          selected={companyForm.industries}
          onClose={() => setTreeModal(null)}
          onApply={(selected) => updateCompanyTreeField('industries', selected)}
        />
      )}

      {certificateDialogOpen && (
        <CertificateUploadModal
          locale={locale}
          documentTypes={documentTypes}
          selectedType={selectedCertificateType}
          selectedFile={selectedCertificateFile}
          uploading={certificateUploading}
          onTypeChange={setSelectedCertificateType}
          onFileChange={handleCertificateFileSelected}
          onRemoveFile={() => setSelectedCertificateFile(null)}
          onClose={closeCertificateDialog}
          onUpload={isCompanyCertificatesSection ? uploadCompanyCertificate : uploadCertificate}
        />
      )}

      {certificateToDelete && (
        <DeleteCertificateModal
          locale={locale}
          certificate={certificateToDelete}
          deleting={certificateDeletingId === certificateToDelete.id}
          onClose={() => {
            if (!certificateDeletingId) setCertificateToDelete(null);
          }}
          onDelete={isCompanyCertificatesSection ? deleteCompanyCertificate : deleteCertificate}
        />
      )}
    </main>
  );
}

function TextInput({
  value,
  onChange,
  onKeyDown,
  placeholder,
  autoFocus,
  type = 'text',
  inputMode,
  min,
  max,
}: {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
  type?: string;
  inputMode?: 'text' | 'numeric' | 'tel' | 'url';
  min?: number;
  max?: number;
}) {
  return (
    <input
      value={value}
      type={type}
      inputMode={inputMode}
      min={min}
      max={max}
      autoFocus={autoFocus}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
    />
  );
}

function MaskedPhoneInput({
  value,
  phoneCode,
  onChange,
  onKeyDown,
}: {
  value: string;
  phoneCode: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      value={formatPhoneWithMask(value, phoneCode)}
      type="tel"
      inputMode="numeric"
      dir="ltr"
      lang="en"
      placeholder={getPhoneMaskConfig(phoneCode).placeholder}
      onChange={(event) => onChange(cleanPhoneForCode(event.target.value, phoneCode))}
      onKeyDown={onKeyDown}
      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-left text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
      style={{ unicodeBidi: 'isolate' }}
    />
  );
}

function SocialRowIcon({ type }: { type: SocialKey }) {
  return (
    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm ring-1 ring-black/5">
      {getSocialIcon(type, 28)}
    </span>
  );
}

function CountryFlag({ country, className = 'h-5 w-5' }: { country: Country | undefined; className?: string }) {
  const flagSrc = getCountryFlagSrc(country);
  if (!flagSrc) return <span className={[className, 'inline-block rounded-full bg-slate-200'].join(' ')} />;

  return (
    <img
      src={flagSrc}
      alt=""
      className={[className, 'shrink-0 rounded-sm object-contain'].join(' ')}
      onError={(event) => {
        event.currentTarget.style.display = 'none';
      }}
    />
  );
}

function CountryInlineValue({
  country,
  locale,
  fallback,
}: {
  country: Country | undefined;
  locale: string;
  fallback: string;
}) {
  if (!country) return <span>{fallback}</span>;

  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      <CountryFlag country={country} />
      <span className="truncate">{getCountryLabel(country, locale)}</span>
    </span>
  );
}

function PhoneInlineValue({
  country,
  code,
  phone,
}: {
  country: Country | undefined;
  code: string;
  phone: string;
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2" dir="ltr">
      <CountryFlag country={country} />
      <span className="truncate text-left" dir="ltr" lang="en" style={{ unicodeBidi: 'isolate' }}>
        {formatPhoneCode(code)} {formatPhoneWithMask(phone, code)}
      </span>
    </span>
  );
}

function SearchableCountrySelect({
  countries,
  locale,
  value,
  mode = 'country',
  loading,
  placeholder,
  searchPlaceholder,
  onSelect,
}: {
  countries: Country[];
  locale: string;
  value: number | string | '';
  mode?: 'country' | 'phoneCode';
  loading: boolean;
  placeholder: string;
  searchPlaceholder: string;
  onSelect: (country: Country) => void;
}) {
  const isRtl = locale === 'ar';
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const selectedCountry =
    mode === 'country'
      ? typeof value === 'number' || value
        ? countries.find((country) => country.id === Number(value))
        : undefined
      : findCountryByPhoneCode(countries, String(value));
  const filteredCountries = useMemo(() => {
    const normalizedQuery = normalizeCountrySearchText(query);
    const numericQuery = normalizePhoneCode(query);
    const filtered = !normalizedQuery
      ? countries
      : countries.filter((country) => {
        const label = normalizeCountrySearchText(getCountryLabel(country, locale));
        const englishName = normalizeCountrySearchText(country.names?.en ?? country.name);
        const arabicName = normalizeCountrySearchText(country.names?.ar);
        const fallbackName = normalizeCountrySearchText(country.name);
        const code = normalizePhoneCode(country.international_code);
        const iso2 = normalizeCountrySearchText(country.iso2);
        const iso3 = normalizeCountrySearchText(country.iso3);

        return (
          label.includes(normalizedQuery) ||
          englishName.includes(normalizedQuery) ||
          arabicName.includes(normalizedQuery) ||
          fallbackName.includes(normalizedQuery) ||
          iso2.includes(normalizedQuery) ||
          iso3.includes(normalizedQuery) ||
          (numericQuery.length > 0 && code.includes(numericQuery))
        );
      });

    return filtered.slice(0, 80);
  }, [countries, locale, query]);

  const selectedLabel = selectedCountry
    ? mode === 'phoneCode'
      ? `${formatPhoneCode(selectedCountry.international_code)} ${getCountryLabel(selectedCountry, locale)}`
      : getCountryLabel(selectedCountry, locale)
    : placeholder;

  return (
    <div
      className="relative"
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget as Node | null;
        if (nextTarget && event.currentTarget.contains(nextTarget)) return;
        setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={loading}
        className="flex h-10 w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 text-start text-sm font-medium text-slate-900 outline-none transition hover:border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
      >
        <span className="flex min-w-0 items-center gap-2">
          <CountryFlag country={selectedCountry} />
          <span className={selectedCountry ? 'truncate' : 'truncate text-slate-400'}>
            {loading ? (isRtl ? 'جار التحميل...' : 'Loading...') : selectedLabel}
          </span>
        </span>
        <IconChevronRight size={16} className={['shrink-0 text-slate-400 transition', open ? 'rotate-90' : isRtl ? 'rotate-180' : ''].join(' ')} />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 p-2">
            <div className="relative">
              <IconSearch size={16} className="absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3" />
              <input
                value={query}
                autoFocus
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-9 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto p-1">
            {filteredCountries.length ? (
              filteredCountries.map((country) => {
                const isSelected = selectedCountry?.id === country.id;
                return (
                  <button
                    key={`${mode}-${country.id}`}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      onSelect(country);
                      setQuery('');
                      setOpen(false);
                    }}
                    className={[
                      'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-start text-sm transition',
                      isSelected ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    <CountryFlag country={country} />
                    <span className="min-w-0 flex-1 truncate">{getCountryLabel(country, locale)}</span>
                    {mode === 'phoneCode' && (
                      <span className="shrink-0 text-xs font-semibold text-slate-500">{formatPhoneCode(country.international_code)}</span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-6 text-center text-sm text-slate-400">{isRtl ? 'لا توجد نتائج' : 'No results found'}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({
  href,
  active,
  icon,
  children,
}: {
  href: string;
  active?: boolean;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        'group relative flex min-h-[50px] items-center gap-4 border-b border-slate-200 px-5 text-base font-medium transition last:border-b-0',
        active
          ? "bg-[#eef5ff] text-slate-700 before:absolute before:inset-y-0 before:w-1 before:bg-blue-500 before:content-[''] ltr:before:left-0 rtl:before:right-0"
          : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-800',
      ].join(' ')}
    >
      <span
        className={[
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition',
          active ? 'bg-slate-100 text-blue-500' : 'bg-slate-100 text-blue-500 group-hover:bg-blue-50',
        ].join(' ')}
      >
        {icon}
      </span>
      <span>{children}</span>
    </Link>
  );
}

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function ProfileRow({
  label,
  value,
  children,
  readOnly,
  isEditing,
  isSaving,
  onEdit,
  onCancel,
  onSave,
  onBlurCapture,
  icon,
}: {
  label: string;
  value: ReactNode;
  children?: ReactNode;
  readOnly?: boolean;
  isEditing?: boolean;
  isSaving?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  onBlurCapture?: (event: FocusEvent<HTMLElement>) => void;
  icon?: ReactNode;
}) {
  return (
    <div
      className="grid gap-3 px-5 py-4 sm:grid-cols-[180px_minmax(0,1fr)_84px] sm:items-center"
      onBlurCapture={onBlurCapture}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        {icon}
        <span>{label}</span>
      </div>

      <div className="min-w-0 text-sm font-medium text-slate-950">
        {isEditing ? children : typeof value === 'string' ? <span className="break-words">{value}</span> : value}
      </div>

      <div className="flex justify-end gap-2">
        {isSaving ? (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <IconLoader2 size={18} className="animate-spin" />
          </span>
        ) : readOnly ? (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-300">
            <IconCircleCheck size={18} />
          </span>
        ) : isEditing ? (
          <>
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={onSave}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 transition hover:border-emerald-300 hover:bg-emerald-100"
              aria-label="Save edit"
            >
              <IconCheck size={18} />
            </button>
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={onCancel}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
              aria-label="Cancel edit"
            >
              <IconX size={18} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-blue-500 transition hover:bg-blue-50 hover:text-blue-600"
            aria-label="Edit field"
          >
            <IconEdit size={20} stroke={1.8} />
          </button>
        )}
      </div>
    </div>
  );
}

function ChipList({ items, locale, empty }: { items: TreeNode[]; locale: string; empty: string }) {
  if (!items.length) return <span className="text-slate-400">{empty}</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={`${item.key}-${item.data.customInput ?? item.label}`}
          className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
        >
          {item.data.customInput || getLocalizedTreeLabel(item, locale)}
        </span>
      ))}
    </div>
  );
}

function CertificateCard({
  certificate,
  typeLabel,
  locale,
  deleting,
  onDelete,
}: {
  certificate: ProfileCertification;
  typeLabel: string;
  locale: string;
  deleting: boolean;
  onDelete: () => void;
}) {
  const isRtl = locale === 'ar';

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <a
        href={certificate.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-6"
        aria-label={`${isRtl ? 'الشهادات' : 'Certifications'}: ${certificate.type.replace(/_/g, ' ').toLowerCase()}`}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-200/70 ring-inset">
            <NewCertificationIcon width={56} height={56} />
          </div>
          <div>
            <p className="m-0 inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-sm font-medium capitalize text-gray-700 ring-1 ring-gray-200/70 ring-inset">
              {typeLabel}
            </p>
            <p className="m-0 mt-2 text-xs text-gray-500">{isRtl ? 'افتح الملف' : 'Open file'}</p>
          </div>
        </div>
      </a>

      <div className="flex items-center justify-end border-t border-slate-100 px-4 py-3">
        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {deleting ? <IconLoader2 size={15} className="animate-spin" /> : <IconTrash size={15} />}
          {isRtl ? 'حذف' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

function CertificateUploadModal({
  locale,
  documentTypes,
  selectedType,
  selectedFile,
  uploading,
  onTypeChange,
  onFileChange,
  onRemoveFile,
  onClose,
  onUpload,
}: {
  locale: string;
  documentTypes: DocumentTypeOption[];
  selectedType: string;
  selectedFile: File | null;
  uploading: boolean;
  onTypeChange: (value: string) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onClose: () => void;
  onUpload: () => void;
}) {
  const isRtl = locale === 'ar';

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">{isRtl ? 'إضافة شهادة' : 'Add Certificate'}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {isRtl ? 'اختر نوع الشهادة وارفع الملف المناسب.' : 'Select the certificate type and upload the file.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label={isRtl ? 'إغلاق' : 'Close'}
          >
            <IconX size={20} />
          </button>
        </div>

        <div className="space-y-4 px-5 py-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="certificate-type">
              {isRtl ? 'نوع الشهادة' : 'Certificate Type'}
            </label>
            <select
              id="certificate-type"
              value={selectedType}
              onChange={(event) => onTypeChange(event.target.value)}
              disabled={uploading}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
            >
              <option value="">{isRtl ? 'اختر نوع الشهادة' : 'Select certificate type'}</option>
              {documentTypes.map((documentType) => (
                <option key={documentType.id} value={documentType.id}>
                  {getDocumentTypeLabel(documentTypes, documentType.id, locale)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="certificate-file">
                {isRtl ? 'الملف' : 'File'}
              </label>
              <span className="text-xs font-medium text-slate-400">PDF, DOC, DOCX, JPG, PNG</span>
            </div>
            <label
              htmlFor="certificate-file"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <IconUpload size={22} stroke={1.8} />
              </span>
              <span className="mt-3 text-sm font-semibold text-slate-800">
                {selectedFile ? selectedFile.name : isRtl ? 'اضغط لاختيار ملف' : 'Click to choose a file'}
              </span>
              <span className="mt-1 text-xs text-slate-500">
                {selectedFile ? formatFileSize(selectedFile.size) : isRtl ? 'الحد المسموح: PDF أو DOC أو DOCX أو JPG أو PNG' : 'Allowed: PDF, DOC, DOCX, JPG, PNG'}
              </span>
              <input
                id="certificate-file"
                type="file"
                accept={CERTIFICATE_ACCEPT}
                disabled={uploading}
                onChange={onFileChange}
                className="hidden"
              />
            </label>
            {selectedFile && (
              <button
                type="button"
                onClick={onRemoveFile}
                disabled={uploading}
                className="mt-2 text-xs font-semibold text-rose-600 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRtl ? 'إزالة الملف' : 'Remove file'}
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRtl ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={onUpload}
            disabled={!selectedType || !selectedFile || uploading}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? <IconLoader2 size={17} className="animate-spin" /> : <IconUpload size={17} />}
            {uploading ? (isRtl ? 'جار الرفع' : 'Uploading') : isRtl ? 'رفع' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteCertificateModal({
  locale,
  certificate,
  deleting,
  onClose,
  onDelete,
}: {
  locale: string;
  certificate: ProfileCertification;
  deleting: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  const isRtl = locale === 'ar';

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <IconTrash size={20} stroke={1.8} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-950">{isRtl ? 'حذف الشهادة' : 'Delete Certificate'}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {isRtl ? 'سيتم حذف هذا الملف من ملفك الشخصي.' : 'This file will be removed from your profile.'}
              </p>
            </div>
          </div>
        </div>
        <div className="px-5 py-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm font-semibold text-slate-800">
            {certificate.name}
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRtl ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? <IconLoader2 size={17} className="animate-spin" /> : <IconTrash size={17} />}
            {deleting ? (isRtl ? 'جار الحذف' : 'Deleting') : isRtl ? 'حذف' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

function TreeSelectorModal({
  title,
  subtitle,
  nodes,
  selected,
  locale,
  loading,
  error,
  onClose,
  onApply,
}: {
  title: string;
  subtitle: string;
  nodes: TreeNode[];
  selected: TreeNode[];
  locale: string;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onApply: (selected: TreeNode[]) => void;
}) {
  const isRtl = locale === 'ar';
  const [query, setQuery] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Set<number | string>>(
    () => new Set(selected.filter((item) => !item.isCustom).map((item) => normalizeTreeKey(item.key)))
  );
  const [customInputs, setCustomInputs] = useState<Record<string, string>>(() => buildTreeCustomInputs(selected));
  const filteredNodes = useMemo(() => filterTree(nodes, query, locale), [locale, nodes, query]);
  const flatNodes = useMemo(() => flattenTree(nodes), [nodes]);
  const selectedCount = selectedKeys.size + Object.values(customInputs).filter((value) => value.trim()).length;

  useEffect(() => {
    setSelectedKeys(new Set(selected.filter((item) => !item.isCustom).map((item) => normalizeTreeKey(item.key))));
    setCustomInputs(buildTreeCustomInputs(selected));
  }, [selected]);

  function toggleNode(node: TreeNode) {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      const key = normalizeTreeKey(node.key);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  function updateCustomInput(parentKey: number | string | null, value: string) {
    const slot = getTreeCustomParentSlot(parentKey);

    setCustomInputs((prev) => {
      const next = { ...prev };

      if (value) {
        next[slot] = value;
      } else {
        delete next[slot];
      }

      return next;
    });
  }

  function applySelection() {
    const selectedFromTree = flatNodes.filter((node) => selectedKeys.has(normalizeTreeKey(node.key)));
    const customNodes = Object.entries(customInputs).flatMap(([slot, rawValue]) => {
      const value = rawValue.trim();
      if (!value) return [];

      const parentKey = slot === ROOT_TREE_CUSTOM_PARENT_KEY ? null : slot;
      const customKey = `custom-${slot}-${value.toLowerCase().replace(/\s+/g, '-')}`;

      return [
        {
          key: customKey,
          label: value,
          data: {
            key: customKey,
            label: value,
            nameEn: value,
            nameAr: value,
            customInput: value,
          },
          children: [],
          parentKey,
          isCustom: true,
        },
      ];
    });

    onApply([...selectedFromTree, ...customNodes]);
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label={isRtl ? 'إغلاق' : 'Close'}
            >
              <IconX size={20} />
            </button>
          </div>

          <div className="relative mt-4">
            <IconSearch size={18} className="absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isRtl ? 'ابحث...' : 'Search...'}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-10 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {loading ? (
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-500">
              <IconLoader2 size={18} className="animate-spin text-blue-500" />
              {isRtl ? 'جار تحميل القائمة...' : 'Loading list...'}
            </div>
          ) : error ? (
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-3 text-sm font-medium text-rose-700">{error}</div>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedKeys(new Set(flatNodes.map((node) => normalizeTreeKey(node.key))))}
                  className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                >
                  {isRtl ? 'اختر الكل' : 'Select All'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedKeys(new Set());
                    setCustomInputs({});
                  }}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200"
                >
                  {isRtl ? 'إلغاء التحديد' : 'Clear'}
                </button>
              </div>

              <div className="space-y-1 rounded-xl border border-slate-100 p-2.5">
                {filteredNodes.length ? (
                  filteredNodes.map((node) => (
                    <TreeNodeRow
                      key={node.key}
                      node={node}
                      selectedKeys={selectedKeys}
                      locale={locale}
                      onToggle={toggleNode}
                      customInputs={customInputs}
                      onCustomInputChange={updateCustomInput}
                    />
                  ))
                ) : (
                  <div className="px-3 py-8 text-center text-sm text-slate-400">{isRtl ? 'لا توجد نتائج' : 'No results found'}</div>
                )}
                <TreeCustomInputRow
                  locale={locale}
                  level={0}
                  value={customInputs[ROOT_TREE_CUSTOM_PARENT_KEY] ?? ''}
                  placeholder={
                    isRtl ? 'أضف خيارًا آخر بدون قسم رئيسي' : 'Add another option without a parent category'
                  }
                  onChange={(value) => updateCustomInput(null, value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-medium text-slate-500">
            {selectedCount} {isRtl ? 'محدد' : 'selected'}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              {isRtl ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={applySelection}
              disabled={loading || Boolean(error)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <IconCheck size={18} />
              {isRtl ? 'تطبيق التغييرات' : 'Apply changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TreeNodeRow({
  node,
  selectedKeys,
  locale,
  onToggle,
  customInputs,
  onCustomInputChange,
  level = 0,
}: {
  node: TreeNode;
  selectedKeys: Set<number | string>;
  locale: string;
  onToggle: (node: TreeNode) => void;
  customInputs: Record<string, string>;
  onCustomInputChange: (parentKey: number | string | null, value: string) => void;
  level?: number;
}) {
  const hasChildren = node.children.length > 0;

  return (
    <div>
      <label
        className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50"
        style={{ paddingInlineStart: 12 + level * 18 }}
      >
        <input
          type="checkbox"
          checked={selectedKeys.has(normalizeTreeKey(node.key))}
          onChange={() => onToggle(node)}
          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span>{getLocalizedTreeLabel(node, locale)}</span>
      </label>
      {hasChildren && (
        <div className="mt-1 space-y-1">
          {node.children.map((child) => (
            <TreeNodeRow
              key={child.key}
              node={child}
              selectedKeys={selectedKeys}
              locale={locale}
              onToggle={onToggle}
              customInputs={customInputs}
              onCustomInputChange={onCustomInputChange}
              level={level + 1}
            />
          ))}
          <TreeCustomInputRow
            locale={locale}
            level={level + 1}
            value={customInputs[getTreeCustomParentSlot(node.key)] ?? ''}
            placeholder={
              locale === 'ar'
                ? `أضف خيارًا آخر ضمن ${getLocalizedTreeLabel(node, locale)}`
                : `Add another option under ${getLocalizedTreeLabel(node, locale)}`
            }
            onChange={(value) => onCustomInputChange(node.key, value)}
          />
        </div>
      )}
    </div>
  );
}

function TreeCustomInputRow({
  locale,
  value,
  placeholder,
  onChange,
  level,
}: {
  locale: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  level: number;
}) {
  const isRtl = locale === 'ar';

  return (
    <div className="py-1" style={{ paddingInlineStart: 12 + level * 18 }}>
      <div className="flex items-center gap-2 rounded-xl px-3 py-2">
        <span className="shrink-0 text-xs font-semibold text-slate-500">{isRtl ? 'أخرى' : 'Other'}</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-8 w-full bg-transparent text-sm rounded-md border border-slate-200 font-medium text-slate-900 outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}

function ProfileSettingsSkeleton() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-5 sm:px-5 lg:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[270px_minmax(0,1fr)]">
        <div className="h-72 animate-pulse rounded-xl bg-white shadow-sm" />
        <div className="space-y-5">
          <div className="h-80 animate-pulse rounded-xl bg-white shadow-sm" />
          <div className="h-64 animate-pulse rounded-xl bg-white shadow-sm" />
        </div>
      </div>
    </main>
  );
}
