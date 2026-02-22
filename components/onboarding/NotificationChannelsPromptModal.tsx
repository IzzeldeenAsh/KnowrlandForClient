'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ActionIcon, Button, Group, Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';

type NotificationChannelsPromptModalProps = {
  locale: string;
};

const QUERY_KEY = 'promptAddChannels';
const DISMISS_KEY = 'postSignupPrompt:addChannels:dismissed';
const PENDING_KEY = 'postSignupPrompt:addChannels:pending';

const PROMPT_IMAGE_URL_AR =
  'https://res.cloudinary.com/dsiku9ipv/image/upload/v1771674434/whatsapp_arabic_wl2vnp.png';
const PROMPT_IMAGE_URL_EN =
  'https://res.cloudinary.com/dsiku9ipv/image/upload/v1771671938/418842237_70d13ee0-5e30-4521-8a99-057840ea5113_actgrf.png';

export default function NotificationChannelsPromptModal({ locale }: NotificationChannelsPromptModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery('(max-width: 48em)');

  const isRTL = locale === 'ar';
  const promptImageUrl = isRTL ? PROMPT_IMAGE_URL_AR : PROMPT_IMAGE_URL_EN;
  const angularBaseUrl =
    process.env.NEXT_PUBLIC_ANGULAR_APP_URL ||
    process.env.NEXT_PUBLIC_DASHBOARD_URL ||
    'https://app.insightabusiness.com';
  const settingsUrl = `${angularBaseUrl}/app/insighter-dashboard/account-settings/notification-settings`;

  const t = useMemo(() => {
    if (isRTL) {
      return {
        close: 'إغلاق',
        later: 'لاحقاً',
        add: 'إضافة الآن',
      };
    }

    return {
      close: 'Close',
      later: 'Maybe later',
      add: 'Add',
    };
  }, [isRTL]);

  const removePromptParam = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has(QUERY_KEY)) return;
    params.delete(QUERY_KEY);
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  const clearPending = () => {
    try {
      localStorage.removeItem(PENDING_KEY);
    } catch {
      // ignore
    }
  };

  const isDismissed = (): boolean => {
    try {
      return sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      return false;
    }
  };

  const setDismissed = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore
    }
  };

  const dismiss = useCallback(() => {
    setDismissed();
    clearPending();
    setOpened(false);
    removePromptParam();
  }, [removePromptParam]);

  useEffect(() => {
    const viaQuery = searchParams.get(QUERY_KEY) === '1';
    let viaPending = false;
    try {
      viaPending = localStorage.getItem(PENDING_KEY) === '1';
    } catch {
      viaPending = false;
    }

    const shouldPrompt = viaQuery || viaPending;
    if (!shouldPrompt) return;

    // If the prompt is explicitly requested via query param, treat it as a forced open
    // (useful for post-signup redirects and for debugging).
    if (!viaQuery && isDismissed()) {
      clearPending();
      removePromptParam();
      return;
    }

    clearPending();
    setOpened(true);
  }, [removePromptParam, searchParams]);

  // Clean up URL once the modal is open (prevents other pages from stripping the flag before we can read it)
  useEffect(() => {
    if (!opened) return;
    if (searchParams.get(QUERY_KEY) !== '1') return;
    removePromptParam();
  }, [opened, removePromptParam, searchParams]);

  const onAdd = () => {
    setDismissed();
    clearPending();
    window.location.href = settingsUrl;
  };

  return (
    <Modal
      opened={opened}
      onClose={dismiss}
      centered
      size={520}
      radius="lg"
      fullScreen={isMobile}
      withCloseButton={false}
      transitionProps={{
        transition: 'pop',
        duration: 200,
      }}
      overlayProps={{
        backgroundOpacity: 0.5,
        blur: 4,
      }}
      styles={{
        content: {
          background: 'transparent',
          border: 'none',
          boxShadow: isMobile ? 'none' : '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          overflow: 'hidden',
        },
        body: { padding: 0 },
        inner: {
          padding: isMobile ? 0 : undefined,
        },
      }}
    >
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          backgroundColor: '#eaf7ee',
        }}
      >
        <img
          src={promptImageUrl}
          alt="Join our WhatsApp & SMS services"
          loading="eager"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />

        <ActionIcon
          onClick={dismiss}
          aria-label={t.close}
          variant="filled"
          color="gray"
          radius="xl"
          style={{
            position: 'absolute',
            top: 12,
            ...(isRTL ? { left: 12 } : { right: 12 }),
            background: 'rgba(255, 255, 255, 0.85)',
            color: '#0f172a',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.18)',
          }}
        >
          <IconX size={18} stroke={2.5} />
        </ActionIcon>

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: isMobile ? '12px 12px 16px' : '14px 16px 18px',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.18) 35%, rgba(0,0,0,0.28) 100%)',
          }}
        >
          <Group gap="sm" wrap="nowrap" justify="space-between">
            <Button
              onClick={dismiss}
              radius="xl"
              variant="default"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.86)',
                borderColor: 'rgba(255,255,255,0.6)',
              }}
            >
              {t.later}
            </Button>
            <Button
              onClick={onAdd}
              radius="xl"
              style={{ flex: 1 }}
              variant="gradient"
              gradient={{ from: '#1d599b', to: '#24d3a8', deg: 110 }}
            >
              {t.add}
            </Button>
          </Group>
        </div>
      </div>
    </Modal>
  );
}
