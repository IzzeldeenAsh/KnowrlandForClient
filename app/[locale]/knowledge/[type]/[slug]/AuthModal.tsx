'use client'

import React from 'react';
import { Modal, Button, Text, Group, Stack, Box } from '@mantine/core';
import { IconLogin, IconUserPlus } from '@tabler/icons-react';
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
    title: isRTL ? 'مطلوب تسجيل الدخول' : 'Login Required',
    message: isRTL 
      ? 'أنت غير مسجل دخول حالياً. يرجى تسجيل الدخول أو إنشاء حساب جديد للوصول إلى هذه الميزة.'
      : 'You are currently not logged in. Please sign up or log in to gain access to this feature.',
    signUp: isRTL ? 'إنشاء حساب جديد' : 'Sign Up',
    logIn: isRTL ? 'تسجيل الدخول' : 'Log In',
    buyAsGuest: isRTL ? 'الشراء كضيف' : 'Buy as Guest',
    cancel: isRTL ? 'إلغاء' : 'Cancel'
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
      title={<Text size="lg" fw={600}>{translations.title}</Text>}
      centered
      size="md"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Stack gap="xl" align="center">
        <Text size="md" color="dimmed" ta="center">
          {translations.message}
        </Text>
        
        <Box mt={10} mb={20} className="text-center">
          <Image 
            src="/images/joinUs.svg" 
            alt="Join Us" 
            width={340} 
            height={240} 
            style={{ margin: '0 auto' }}
            priority
          />
        </Box>

        <Stack gap="md" w="100%">
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

          {guestCheckoutUrl && (
            <Button
              onClick={handleBuyAsGuest}
              variant="outline"
              size="md"
              fullWidth
              disabled={disableGuestCheckout}
            >
              {translations.buyAsGuest}
            </Button>
          )}
        </Stack>
      </Stack>
    </Modal>
  );
};

export default AuthModal;