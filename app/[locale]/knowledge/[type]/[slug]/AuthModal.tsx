'use client'

import React from 'react';
import { Modal, Button, Text, Group, Stack, Box } from '@mantine/core';
import { IconLogin, IconUserPlus } from '@tabler/icons-react';
import Image from 'next/image';

interface AuthModalProps {
  opened: boolean;
  onClose: () => void;
  locale?: string | string[];
}

const AuthModal: React.FC<AuthModalProps> = ({ opened, onClose, locale }) => {
  const isRTL = locale === 'ar';

  const translations = {
    title: isRTL ? 'مطلوب تسجيل الدخول' : 'Login Required',
    message: isRTL 
      ? 'أنت غير مسجل دخول حالياً. يرجى تسجيل الدخول أو إنشاء حساب جديد للوصول إلى هذه الميزة.'
      : 'You are currently not logged in. Please sign up or log in to gain access to this feature.',
    signUp: isRTL ? 'إنشاء حساب جديد' : 'Sign Up',
    logIn: isRTL ? 'تسجيل الدخول' : 'Log In',
    cancel: isRTL ? 'إلغاء' : 'Cancel'
  };

  const handleSignUp = () => {
    // Use environment variables or domain-relative URLs instead of hardcoded localhost
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL || window.location.origin;
    window.location.href = `${baseUrl}/auth/sign-up`;
  };

  const handleLogIn = () => {
    // Use environment variables or domain-relative URLs instead of hardcoded localhost
    const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL || window.location.origin;
    window.location.href = `${baseUrl}/auth/login`;
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
            width={280} 
            height={210} 
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
        </Stack>
      </Stack>
    </Modal>
  );
};

export default AuthModal;