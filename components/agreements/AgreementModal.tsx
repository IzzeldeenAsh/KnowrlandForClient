'use client'

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Modal, Button, Text, Group, Stack, ScrollArea, Loader, Alert, ActionIcon } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { getAuthToken } from '@/lib/authToken';

type AgreementType = 'insighter_agreement' | 'company_agreement';

interface AgreementModalProps {
  opened: boolean;
  onClose: () => void;
  onAccepted?: () => void;
  locale?: string | string[];
  agreementType?: AgreementType; // if omitted, derived from role/accountType
  acceptUuid?: string; // if not provided, will use server uuid
  roles?: string[]; // used to derive agreementType when not provided
  accountType?: string; // used to derive agreementType when not provided
}

const AgreementModal: React.FC<AgreementModalProps> = ({
  opened,
  onClose,
  onAccepted,
  locale,
  agreementType,
  acceptUuid,
}) => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [html, setHtml] = useState<string>('');
  const [title, setTitle] = useState<string>('Agreement');
  const [error, setError] = useState<string | null>(null);
  const [applyAt, setApplyAt] = useState<string | null>(null);
  const [serverUuid, setServerUuid] = useState<string | null>(null);
  const [canAccept, setCanAccept] = useState<boolean>(false);
  const isRTL = locale === 'ar';
  const { isCompany: isCompanyRole, isInsighter: isInsighterRole, roles: userRoles } = useRoleCheck();
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const computedAgreementType: AgreementType = useMemo(() => {
    if (agreementType) return agreementType;
    if (isCompanyRole()) return 'company_agreement';
    if (isInsighterRole()) return 'insighter_agreement';
    return 'insighter_agreement';
  }, [agreementType, userRoles]);

  const t = useMemo(() => {
    return {
      header: isRTL ? 'اتفاقية الاستخدام' : 'Agreement',
      cancel: isRTL ? 'التجاوز حالياً' : 'Skip for now',
      accept: isRTL ? 'أوافق' : 'Accept',
      loadError: isRTL ? 'تعذر تحميل الاتفاقية' : 'Failed to load agreement',
      submitError: isRTL ? 'تعذر قبول الاتفاقية' : 'Failed to accept agreement',
    };
  }, [isRTL]);
  const formattedApplyAt = React.useMemo(() => {
    if (!applyAt) return null;
    const d = new Date(applyAt);
    return d.toLocaleDateString(locale === 'ar' ? 'ar' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [applyAt, locale]);

  const isScrolledToBottom = (el: HTMLElement): boolean => {
    const threshold = 2; // px tolerance
    return el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
  };

  const updateCanAccept = () => {
    const el = viewportRef.current;
    if (!el) {
      setCanAccept(false);
      return;
    }
    const fits = el.scrollHeight <= el.clientHeight + 1;
    setCanAccept(fits || isScrolledToBottom(el));
  };

  const handleScrollPositionChange = (_pos: { x: number; y: number }) => {
    if (canAccept) return;
    const el = viewportRef.current;
    if (!el) return;
    if (isScrolledToBottom(el)) {
      setCanAccept(true);
    }
  };

  useEffect(() => {
    let active = true;
    const fetchAgreement = async () => {
      if (!opened) return;
      setLoading(true);
      setError(null);
      setCanAccept(false);
      try {
        const res = await fetch(`https://api.insightabusiness.com/api/common/setting/guideline/type/last/${computedAgreementType}`, {
          headers: {
            Accept: 'application/json',
            'Accept-Language': (locale as string) || 'en',
          },
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        if (!active) return;
        setHtml(data?.data?.guideline || '');
        setTitle(data?.data?.name || t.header);
        setApplyAt(data?.data?.apply_at || null);
        setServerUuid(data?.data?.uuid || null);
      } catch (e: any) {
        if (!active) return;
        setError(t.loadError);
      } finally {
        if (active) setLoading(false);
        // After content loads, reset scroll and evaluate if it fits
        requestAnimationFrame(() => {
          if (!viewportRef.current) return;
          viewportRef.current.scrollTo({ top: 0 });
          updateCanAccept();
        });
      }
    };
    fetchAgreement();
    return () => {
      active = false;
    };
  }, [opened, computedAgreementType, locale, t.loadError, t.header]);

  useEffect(() => {
    if (!opened || loading) return;
    const onResize = () => updateCanAccept();
    const id = window.setTimeout(updateCanAccept, 0);
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('resize', onResize);
    };
  }, [html, opened, loading]);

  const printTerms = () => {
    const printContent = `
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
              margin: 20px;
              line-height: 1.6;
              color: #333;
            }
            h1, h2, h3, h4, h5, h6 {
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
              font-weight: 700;
            }
            h1 { font-size: 1.75rem; }
            h2 { font-size: 1.5rem; }
            h3 { font-size: 1.25rem; }
            p {
              margin: 12px 0;
              line-height: 1.75;
            }
            hr { margin: 16px 0; }
            ul, ol {
              padding-left: 1.25rem;
              margin: 12px 0;
            }
            li { margin: 6px 0; }
            blockquote {
              margin: 12px 0;
              padding: 8px 12px;
              border-left: 3px solid #e5e7eb;
              background: #fafafa;
              border-radius: 6px;
            }
          </style>
        </head>
        <body ${isRTL ? 'dir="rtl"' : ''}>
          <h1>${title}</h1>
          ${html}
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const onAccept = async () => {
    if (submitting) return;
    const finalUuid = acceptUuid ?? serverUuid;
    if (!finalUuid) {
      setError(t.submitError);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const token = getAuthToken();
      const res = await fetch(`https://api.insightabusiness.com/api/account/agreement/accept/${finalUuid}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Accept-Language': (locale as string) || 'en',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      onAccepted?.();
      onClose();
    } catch (e: any) {
      setError(t.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group style={{ width: '100%' }}>
          <Text size="lg" fw={600}>{title}</Text>
          <div style={{ marginLeft: 'auto', marginRight: '8px' }}>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={printTerms}
              disabled={loading || !html}
              size="sm"
            >
              <IconPrinter size={16} />
            </ActionIcon>
          </div>
        </Group>
      }
      centered
      size="xl"
      dir={isRTL ? 'rtl' : 'ltr'}
      withCloseButton={!submitting}
      closeOnClickOutside={!submitting}
      closeOnEscape={!submitting}
      radius="md"
    >
      <Stack gap="md">
        {error && (
          <Alert color="red" variant="light">
            {error}
          </Alert>
        )}
        <div style={{ position: 'relative', minHeight: 240 }}>
          {loading ? (
            <Group justify="center" p="xl">
              <Loader />
            </Group>
          ) : (
            <ScrollArea h={480} p="xs" viewportRef={viewportRef} onScrollPositionChange={handleScrollPositionChange}>
              {formattedApplyAt && (
                <Alert color="blue" variant="light" mb="sm">
                  {isRTL ? 'سيتم تطبيق هذه الشروط الجديدة بتاريخ' : 'These new conditions will be applied on'} {formattedApplyAt}
                  <br />
                  {isRTL ? 'تجنب ايقاف الحساب بالموافقة على هذه الشروط' : 'Avoid account suspension by accepting these conditions'}
                </Alert>
              )}
              <div
                className="agreement-html"
                style={{ paddingInline: 16, direction: isRTL ? 'rtl' : 'ltr' }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
              <style jsx>{`
                /* Use :global because inner HTML is injected without styled-jsx scoping */
                :global(.agreement-html h1) {
                  font-size: 1.75rem !important; /* ~28px */
                  font-weight: 800 !important;
                  margin-top: 1.5rem !important;
                  margin-bottom: 0.75rem !important;
                }
                :global(.agreement-html h2) {
                  font-size: 1.5rem !important; /* ~24px */
                  font-weight: 700 !important;
                  margin-top: 1.25rem !important;
                  margin-bottom: 0.5rem !important;
                }
                :global(.agreement-html h3) {
                  font-size: 1.25rem !important; /* ~20px */
                  font-weight: 700 !important;
                  margin-top: 1rem !important;
                  margin-bottom: 0.5rem !important;
                }
                :global(.agreement-html h4) {
                  font-size: 1.125rem !important; /* ~18px */
                  font-weight: 600 !important;
                  margin-top: 0.75rem !important;
                  margin-bottom: 0.5rem !important;
                }
                :global(.agreement-html h5) {
                  font-size: 1rem !important; /* 16px */
                  font-weight: 600 !important;
                  margin-top: 0.75rem !important;
                  margin-bottom: 0.5rem !important;
                }
                :global(.agreement-html h6) {
                  font-size: 0.875rem !important; /* 14px */
                  font-weight: 600 !important;
                  margin-top: 0.5rem !important;
                  margin-bottom: 0.25rem !important;
                  color: #374151 !important; /* gray-700 */
                }
                :global(.agreement-html p) {
                  margin: 12px 0 !important;
                  line-height: 1.75 !important;
                }
                :global(.agreement-html h1 + p),
                :global(.agreement-html h2 + p),
                :global(.agreement-html h3 + p),
                :global(.agreement-html h4 + p),
                :global(.agreement-html h5 + p),
                :global(.agreement-html h6 + p) {
                  margin-top: 8px !important;
                }
                :global(.agreement-html hr) {
                  margin: 16px 0 !important;
                }
                :global(.agreement-html) {
                  line-height: 1.75 !important;
                }
                :global(.agreement-html ul),
                :global(.agreement-html ol) {
                  padding-inline-start: 1.25rem !important;
                  margin: 12px 0 !important;
                }
                :global(.agreement-html li) {
                  margin: 6px 0 !important;
                  line-height: 1.75 !important;
                }
                :global(.agreement-html blockquote) {
                  margin: 12px 0 !important;
                  padding: 8px 12px !important;
                  border-inline-start: 3px solid #e5e7eb !important;
                  background: #fafafa !important;
                  border-radius: 6px !important;
                }
              `}</style>
            </ScrollArea>
          )}
        </div>
        <Group justify="flex-end" mt="sm">
          <Button variant="default" onClick={onClose} disabled={submitting}>
            {t.cancel}
          </Button>
          <Button
            onClick={onAccept}
            loading={submitting}
            disabled={loading || !(acceptUuid ?? serverUuid) || !canAccept}
          >
            {t.accept}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AgreementModal;

