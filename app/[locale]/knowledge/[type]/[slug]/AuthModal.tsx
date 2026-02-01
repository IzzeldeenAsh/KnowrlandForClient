'use client'

import React from 'react';
import { Modal, Button, Text, Stack, Box, Divider, Group } from '@mantine/core';
import { IconLogin, IconUserPlus, IconDownload, IconShoppingBag, IconBellRinging, IconSparkles } from '@tabler/icons-react';
import Image from 'next/image';

interface AuthModalProps {
  opened: boolean;
  onClose: () => void;
  locale?: string | string[];
  guestCheckoutUrl?: string | null;
  disableGuestCheckout?: boolean;
}

// Helper function to get the Angular app URL based on current domain
const getAngularAppUrl = (): string => {
  if (typeof window === 'undefined') return 'https://app.insightabusiness.com';

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  // Production domains
  if (hostname.includes('foresighta.co')) {
    return `${protocol}//app.insightabusiness.com`;
  }
  if (hostname.includes('insightabusiness.com')) {
    return `${protocol}//app.insightabusiness.com`;
  }

  // Local development
  return 'https://app.insightabusiness.com';
};

const AuthModal: React.FC<AuthModalProps> = ({
  opened,
  onClose,
  locale,
  guestCheckoutUrl = null,
  disableGuestCheckout = false,
}) => {
  const isRTL = locale === 'ar';
  const angularAppUrl = getAngularAppUrl();

  const translations = {
    title: isRTL ? 'الشراء' : 'Buy Now',
    titleDisableGuestCheckout: isRTL ? 'التسجيل' : 'Login/Signup',
    message: isRTL
      ? 'سجّل دخولك أو أنشئ حساباً للاستفادة من مزايا إضافية وتجربة أفضل.'
      : 'Log in or create an account to unlock extra benefits and a better experience.',
    signUp: isRTL ? 'إنشاء حساب' : 'Sign Up',
    logIn: isRTL ? 'تسجيل الدخول' : 'Log In',
    benefitsTitle: isRTL ? 'لماذا تسجّل حساباً؟' : 'Why sign in/up?',
    benefit1: isRTL ? 'إمكانية إعادة التحميل في أي وقت' : 'Re-download anytime',
    benefit2: isRTL ? 'تتبع مشترياتك وتنظيمها بسهولة' : 'Track and manage your purchases',
    benefit3: isRTL ? 'تنبيهات وتحديثات ومحتوى مشابه' : 'Get updates and related insights',
    benefit4: isRTL ? 'تجربة أسرع ودعم أفضل' : 'Faster experience and better support',
    buyAsGuest: isRTL ? 'الشراء كضيف' : 'Buy as Guest',
    or: isRTL ? 'أو' : 'OR',
    guestDisabledNote: isRTL
      ? 'الشراء كضيف غير متاح لهذا الطلب. الرجاء تسجيل الدخول للمتابعة.'
      : 'Guest checkout is not available for this request. Please log in to continue.',
    cancel: isRTL ? 'إلغاء' : 'Cancel',
  };

  const handleSignUp = () => {
    const currentUrl = window.location.href;
    window.location.href = `${angularAppUrl}/auth/sign-up?returnUrl=${encodeURIComponent(currentUrl)}`;
  };

  const handleLogIn = () => {
    const currentUrl = window.location.href;
    window.location.href = `${angularAppUrl}/auth/login?returnUrl=${encodeURIComponent(currentUrl)}`;
  };

  const handleBuyAsGuest = () => {
    if (!guestCheckoutUrl || disableGuestCheckout) return;
    window.location.href = guestCheckoutUrl;
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        disableGuestCheckout ?
      <Text size="lg" fw={600}>{translations.titleDisableGuestCheckout}</Text> :
      <Text size="lg" fw={600}>{translations.title}</Text>
    }
      centered
      size="lg"
      padding="lg"
      styles={{
        title: { fontSize: '1.15rem', fontWeight: 700 },
        body: { paddingTop: 8 },
      }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Stack gap="sm">
     

        <Box  className="text-center">
          <Image 
            src="/images/joinUs.svg" 
            alt="Join Us" 
            width={200} 
            height={150} 
            style={{ margin: '0 auto' }}
            priority
          />
        </Box> 
        <Text size="sm" c="dimmed" ta="center">
          {translations.message}
        </Text>
<div className='flex flex-col sm:flex-row gap-2 w-full'>
          <Button
            leftSection={<IconLogin size={18} />}
            onClick={handleLogIn}
            variant="light"
            size="md"
            fullWidth
          >
            {translations.logIn}
          </Button>

          <Button
            leftSection={<IconUserPlus size={18} />}
            onClick={handleSignUp}
            size="md"
            fullWidth
          >
            {translations.signUp}
          </Button>

        
        </div>
        {!disableGuestCheckout &&
        <Box
          p="md"
          style={{
            border: '1px solid var(--mantine-color-gray-2)',
            borderRadius: 12,
            background: 'linear-gradient(180deg, rgba(59,130,246,0.06), rgba(20,184,166,0.04))',
          }}
        >
          <Text fw={700} mb={10}>
            {translations.benefitsTitle}
          </Text>

          <Stack gap={10}>
            <Group gap={10} wrap="nowrap" align="center" >
              <Box
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(59,130,246,0.12)',
                  color: 'rgb(37,99,235)',
                  flexShrink: 0,
                }}
              >
                <IconDownload size={18} />
              </Box>
              <Text size="sm">{translations.benefit1}</Text>
            </Group>

            <Group gap={10} wrap="nowrap" align="center" >
              <Box
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(20,184,166,0.12)',
                  color: 'rgb(13,148,136)',
                  flexShrink: 0,
                }}
              >
                <IconShoppingBag size={18} />
              </Box>
              <Text size="sm">{translations.benefit2}</Text>
            </Group>

            <Group gap={10} wrap="nowrap" align="center" >
              <Box
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(245,158,11,0.14)',
                  color: 'rgb(217,119,6)',
                  flexShrink: 0,
                }}
              >
                <IconBellRinging size={18} />
              </Box>
              <Text size="sm">{translations.benefit3}</Text>
            </Group>

            <Group gap={10} wrap="nowrap" align="center" >
              <Box
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(139,92,246,0.14)',
                  color: 'rgb(124,58,237)',
                  flexShrink: 0,
                }}
              >
                <IconSparkles size={18} />
              </Box>
              <Text size="sm">{translations.benefit4}</Text>
            </Group>
          </Stack>
        </Box>
}
{!disableGuestCheckout  &&
        <Stack gap="sm" w="100%">
          {guestCheckoutUrl && (
            <>
              <Divider
                label={translations.or}
                labelPosition="center"
                my={4}
                styles={{
                  label: {
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--mantine-color-gray-6)',
                  },
                }}
              />

              <Button
                onClick={handleBuyAsGuest}
                variant="outline"
                size="md"
                fullWidth
                disabled={disableGuestCheckout}
              >
                {translations.buyAsGuest}
              </Button>

              {disableGuestCheckout && (
                <Text size="xs" c="dimmed" ta="center">
                  {translations.guestDisabledNote}
                </Text>
              )}
            </>
          )}
        </Stack>
}
      </Stack>
    </Modal>
  );
};

export default AuthModal;