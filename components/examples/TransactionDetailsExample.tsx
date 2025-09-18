'use client'

import React, { useState } from 'react';
import { Button, Stack, Paper, Text, Group, Badge, Card } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import TransactionDetailsModal from '../ui/TransactionDetailsModal';

const TransactionDetailsExample: React.FC<{ locale?: string }> = ({ locale }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isRTL = locale === 'ar';

  const sampleTransaction = {
    "transaction": "withdraw",
    "amount": -50,
    "date": "2025-09-14 17:44:07",
    "type": "book_meeting",
    "order": {
      "sub_orders": [
        {
          "meeting_booking": {
            "date": "2025-09-20",
            "start_time": "09:00",
            "end_time": "10:00",
            "status": "pending",
            "title": "Strategy Discussion Meeting",
            "description": "Monthly strategy alignment and planning discussion"
          }
        }
      ]
    }
  };

  const translations = {
    viewDetails: isRTL ? 'عرض التفاصيل' : 'View Details',
    transactionList: isRTL ? 'قائمة المعاملات' : 'Transaction List',
    meetingBooking: isRTL ? 'حجز اجتماع' : 'Meeting Booking',
    withdraw: isRTL ? 'سحب' : 'Withdraw',
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString(
      locale === 'ar' ? 'ar-SA' : 'en-US',
      {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    );
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <Stack gap="md">
        <Text size="xl" fw={600}>{translations.transactionList}</Text>

        <Card withBorder radius="md" padding="md">
          <Group justify="space-between" align="center">
            <div>
              <Group gap="sm" mb="xs">
                <Text fw={500}>{translations.meetingBooking}</Text>
                <Badge color="red" variant="light">{translations.withdraw}</Badge>
              </Group>

              <Group gap="lg">
                <Text size="sm" c="dimmed">
                  {formatDateTime(sampleTransaction.date)}
                </Text>
                <Text fw={600} c="red">
                  -{formatCurrency(sampleTransaction.amount)}
                </Text>
              </Group>
            </div>

            <Button
              variant="light"
              size="sm"
              leftSection={<IconEye size={16} />}
              onClick={() => setIsModalOpen(true)}
            >
              {translations.viewDetails}
            </Button>
          </Group>
        </Card>

        <Paper p="md" bg="gray.0" radius="md">
          <Text size="sm" c="dimmed" mb="sm">
            Click "{translations.viewDetails}" to see the modal with meeting booking details
          </Text>
          <Text size="xs" c="dimmed">
            The modal will display transaction info, meeting title, date, time, status, and description
          </Text>
        </Paper>
      </Stack>

      <TransactionDetailsModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={sampleTransaction}
        locale={locale}
      />
    </div>
  );
};

export default TransactionDetailsExample;