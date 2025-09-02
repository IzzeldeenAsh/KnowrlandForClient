'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Checkbox, Group, Text, Badge, Divider } from '@mantine/core';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/toast/ToastContext';

interface Document {
  id: number;
  file_name: string;
  file_size: number;
  price: string;
  description: string | null;
  file_extension: string;
  is_purchased?: boolean;
  table_of_content: Array<{
    chapter?: {
      title: string;
    };
    title?: string;
  }>;
}

interface BuyModalProps {
  opened: boolean;
  onClose: () => void;
  documents: Document[];
  preSelectedDocumentId?: number;
  preSelectedDocumentIds?: number[];
  knowledgeSlug: string;
}

const getFileIconByExtension = (extension: string) => {
  const iconMap: { [key: string]: string } = {
    pdf: '/file-icons/pdf.svg',
    doc: '/file-icons/doc.svg',
    docx: '/file-icons/doc.svg',
    xls: '/file-icons/xls.svg',
    xlsx: '/file-icons/xlsx.svg',
    ppt: '/file-icons/ppt.svg',
    pptx: '/file-icons/ppt.svg',
    csv: '/file-icons/csv.svg',
    txt: '/file-icons/txt.svg',
    zip: '/file-icons/zip.svg',
    rar: '/file-icons/zip.svg',
    default: '/file-icons/file.svg'
  };
  return iconMap[extension.toLowerCase()] || iconMap.default;
};

export default function BuyModal({ opened, onClose, documents, preSelectedDocumentId, preSelectedDocumentIds, knowledgeSlug  }: BuyModalProps) {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';
  const router = useRouter();
  
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Translations
  const translations = {
    buyDocuments: isRTL ? 'شراء المستندات' : 'Buy Documents',
    selectDocuments: isRTL ? 'اختر المستندات التي تريد شراءها' : 'Select the documents you want to buy',
    totalPrice: isRTL ? 'السعر الإجمالي' : 'Total Price',
    buy: isRTL ? 'شراء' : 'Buy',
    cancel: isRTL ? 'إلغاء' : 'Cancel',
    free: isRTL ? 'مجاني' : 'Free',
    success: isRTL ? 'تم الشراء بنجاح!' : 'Purchase successful!',
    error: isRTL ? 'فشل في الشراء' : 'Purchase failed',
    selectAtLeastOne: isRTL ? 'يرجى اختيار مستند واحد على الأقل' : 'Please select at least one document',
    alreadyPurchased: isRTL ? 'تم الشراء ' : 'Purchased',
  };

  // Initialize selected documents with pre-selected ones (excluding already purchased)
  useEffect(() => {
    if (preSelectedDocumentIds && preSelectedDocumentIds.length > 0) {
      // Filter out already purchased documents from pre-selection
      const unpurchasedIds = preSelectedDocumentIds.filter(id => {
        const doc = documents.find(d => d.id === id);
        return doc && !doc.is_purchased;
      });
      setSelectedDocuments(unpurchasedIds);
    } else if (preSelectedDocumentId) {
      const doc = documents.find(d => d.id === preSelectedDocumentId);
      if (doc && !doc.is_purchased) {
        setSelectedDocuments([preSelectedDocumentId]);
      }
    }
  }, [preSelectedDocumentId, preSelectedDocumentIds, documents]);

  // Calculate total price
  const totalPrice = selectedDocuments.reduce((sum, docId) => {
    const doc = documents.find(d => d.id === docId);
    return sum + (doc ? parseFloat(doc.price) : 0);
  }, 0);

  // Handle document selection
  const handleDocumentToggle = (documentId: number) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  // Handle purchase
  const handlePurchase = () => {
    if (selectedDocuments.length === 0) {
      toast.error(translations.selectAtLeastOne, translations.error);
      return;
    }

    // Create query parameters for checkout page
    const queryParams = new URLSearchParams({
      slug: knowledgeSlug,
      documents: selectedDocuments.join(','),
    });

    // Navigate to checkout page
    router.push(`/${locale}/checkout?${queryParams.toString()}`);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={translations.buyDocuments}
      size="lg"
      centered
      styles={{
        title: {
          fontSize: '1.25rem',
          fontWeight: 600,
        },
      }}
    >
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        <Text size="sm" c="dimmed" mb="md">
          {translations.selectDocuments}
        </Text>

        <div className="space-y-3 mb-6">
          {documents.map((doc) => {
            const isPurchased = doc.is_purchased;
            const isSelected = selectedDocuments.includes(doc.id);
            
            return (
              <div
                key={doc.id}
                className={`p-4 border rounded-lg transition-colors ${
                  isPurchased 
                    ? 'border-gray-200 bg-gray-50 opacity-60' 
                    : isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Group gap="md" wrap="nowrap">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleDocumentToggle(doc.id)}
                    disabled={isPurchased}
                    size="md"
                  />
                  
                  <div className="flex-shrink-0">
                    <Image
                      src={getFileIconByExtension(doc.file_extension)}
                      alt={`${doc.file_extension.toUpperCase()} file`}
                      width={32}
                      height={32}
                      className={isPurchased ? 'opacity-50' : ''}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Text size="sm" fw={500} truncate c={isPurchased ? 'dimmed' : undefined}>
                      {doc.file_name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {(doc.file_size / 1024).toFixed(2)} KB
                    </Text>
                  </div>

                  <div className="flex-shrink-0">
                    {isPurchased ? (
                      <Badge color="gray" variant="light">
                        {translations.alreadyPurchased}
                      </Badge>
                    ) : parseFloat(doc.price) === 0 ? (
                      <Badge color="green" variant="light">
                        {translations.free}
                      </Badge>
                    ) : (
                      <Badge color="blue" variant="light">
                        ${parseFloat(doc.price).toFixed(2)}
                      </Badge>
                    )}
                  </div>
                </Group>
              </div>
            );
          })}
        </div>

        <Divider my="md" />

        <div className="flex justify-between items-center mb-6">
          <Text size="lg" fw={600}>
            {translations.totalPrice}
          </Text>
          <Badge size="lg" color="blue" variant="filled">
            ${totalPrice.toFixed(2)}
          </Badge>
        </div>

        <Group justify="flex-end" gap="md">
          <Button
            variant="outline"
            onClick={onClose}
          >
            {translations.cancel}
          </Button>
          <Button
            onClick={handlePurchase}
            disabled={selectedDocuments.length === 0}
          >
            {translations.buy}
          </Button>
        </Group>
      </div>
    </Modal>
  );
}