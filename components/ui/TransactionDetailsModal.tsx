'use client'

import React from 'react';
import { Modal, Text, Group, Stack, Badge, Divider, Box, Paper } from '@mantine/core';
import { IconCalendar, IconClock, IconUser, IconFileText } from '@tabler/icons-react';

interface MeetingBooking {
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  title: string;
  description: string;
}

interface SubOrder {
  meeting_booking?: MeetingBooking;
}

interface Transaction {
  transaction: string;
  amount: number;
  date: string;
  type: string;
  order?: {
    orderables?: SubOrder[];
  };
}

interface TransactionDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  locale?: string | string[];
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  opened,
  onClose,
  transaction,
  locale
}) => {
  const isRTL = locale === 'ar';

  const translations = {
    title: isRTL ? 'تفاصيل المعاملة' : 'Transaction Details',
    transactionType: isRTL ? 'نوع المعاملة' : 'Transaction Type',
    amount: isRTL ? 'المبلغ' : 'Amount',
    date: isRTL ? 'التاريخ' : 'Date',
    type: isRTL ? 'النوع' : 'Type',
    meetingDetails: isRTL ? 'تفاصيل الجلسة الاستشارية' : 'Session Details',
    meetingTitle: isRTL ? 'عنوان الجلسة الاستشارية' : 'Session Title',
    meetingDate: isRTL ? 'تاريخ الجلسة الاستشارية' : 'Session Date',
    startTime: isRTL ? 'وقت البداية' : 'Start Time',
    endTime: isRTL ? 'وقت النهاية' : 'End Time',
    status: isRTL ? 'الحالة' : 'Status',
    description: isRTL ? 'الوصف' : 'Description',
    noDetails: isRTL ? 'لا توجد تفاصيل متاحة' : 'No details available',
    withdraw: isRTL ? 'سحب' : 'Withdraw',
    deposit: isRTL ? 'إيداع' : 'Deposit',
    pending: isRTL ? 'معلق' : 'Pending',
    confirmed: isRTL ? 'مؤكد' : 'Confirmed',
    cancelled: isRTL ? 'ملغى' : 'Cancelled'
  };

  if (!transaction) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'en-US' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      locale === 'ar' ? 'en-US' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString(
      locale === 'ar' ? 'en-US' : 'en-US',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'yellow';
      case 'confirmed': return 'green';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getTransactionTypeText = (type: string) => {
    return type === 'withdraw' ? translations.withdraw : translations.deposit;
  };

  const meetingBooking = transaction.order?.orderables?.[0]?.meeting_booking;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text size="lg" fw={600}>{translations.title}</Text>}
      centered
      size="md"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Stack gap="md">
        {/* Transaction Overview */}
        <Paper p="md" withBorder radius="md" bg="gray.0">
          <Stack gap="sm">
            <Group justify="space-between" align="center">
              <Text size="sm" c="dimmed">{translations.transactionType}</Text>
              <Badge
                color={transaction.transaction === 'withdraw' ? 'red' : 'green'}
                variant="light"
              >
                {getTransactionTypeText(transaction.transaction)}
              </Badge>
            </Group>

            <Group justify="space-between" align="center">
              <Text size="sm" c="dimmed">{translations.amount}</Text>
              <Text fw={600} c={transaction.amount < 0 ? 'red' : 'green'}>
                {transaction.amount < 0 ? '-' : '+'}{formatCurrency(transaction.amount)}
              </Text>
            </Group>

            <Group justify="space-between" align="center">
              <Text size="sm" c="dimmed">{translations.date}</Text>
              <Text size="sm">{formatDateTime(transaction.date)}</Text>
            </Group>

            <Group justify="space-between" align="center">
              <Text size="sm" c="dimmed">{translations.type}</Text>
              <Text size="sm">{transaction.type}</Text>
            </Group>
          </Stack>
        </Paper>

        {/* Meeting Details */}
        {meetingBooking && (
          <>
            <Divider label={translations.meetingDetails} labelPosition="center" />

            <Paper p="md" withBorder radius="md">
              <Stack gap="md">
                <Group gap="sm" align="flex-start">
                  <IconFileText size={16} color="var(--mantine-color-blue-6)" />
                  <Box flex={1}>
                    <Text size="sm" c="dimmed" mb={4}>{translations.meetingTitle}</Text>
                    <Text fw={500}>{meetingBooking.title}</Text>
                  </Box>
                </Group>

                <Group gap="sm" align="flex-start">
                  <IconCalendar size={16} color="var(--mantine-color-blue-6)" />
                  <Box flex={1}>
                    <Text size="sm" c="dimmed" mb={4}>{translations.meetingDate}</Text>
                    <Text>{formatDate(meetingBooking.date)}</Text>
                  </Box>
                </Group>

                <Group gap="md" grow>
                  <Group gap="sm" align="flex-start">
                    <IconClock size={16} color="var(--mantine-color-green-6)" />
                    <Box>
                      <Text size="sm" c="dimmed" mb={4}>{translations.startTime}</Text>
                      <Text size="sm">{meetingBooking.start_time}</Text>
                    </Box>
                  </Group>

                  <Group gap="sm" align="flex-start">
                    <IconClock size={16} color="var(--mantine-color-red-6)" />
                    <Box>
                      <Text size="sm" c="dimmed" mb={4}>{translations.endTime}</Text>
                      <Text size="sm">{meetingBooking.end_time}</Text>
                    </Box>
                  </Group>
                </Group>

                <Group gap="sm" align="flex-start">
                  <IconUser size={16} color="var(--mantine-color-blue-6)" />
                  <Box flex={1}>
                    <Text size="sm" c="dimmed" mb={4}>{translations.status}</Text>
                    <Badge color={getStatusColor(meetingBooking.status)} variant="light">
                      {translations[meetingBooking.status as keyof typeof translations] || meetingBooking.status}
                    </Badge>
                  </Box>
                </Group>

                {meetingBooking.description && (
                  <Box>
                    <Text size="sm" c="dimmed" mb={4}>{translations.description}</Text>
                    <Paper bg="gray.1" p="sm" radius="sm">
                      <Text size="sm">{meetingBooking.description}</Text>
                    </Paper>
                  </Box>
                )}
              </Stack>
            </Paper>
          </>
        )}

        {!meetingBooking && transaction.order?.orderables && (
          <Text size="sm" c="dimmed" ta="center" py="md">
            {translations.noDetails}
          </Text>
        )}
      </Stack>
    </Modal>
  );
};

export default TransactionDetailsModal;