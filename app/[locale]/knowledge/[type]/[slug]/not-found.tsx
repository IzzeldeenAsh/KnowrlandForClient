'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@mantine/core';
import FooterLight from '@/components/ui/footer-light';
import KnowledgeIcon from '@/components/icons/knowledge-icon';

export default function KnowledgeNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <KnowledgeIcon width={80} height={80} />
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            Knowledge Not Found
          </h1>
          
          <p className="text-xl text-gray-500 mb-8">
            We couldn't find the knowledge resource you're looking for. It may have been removed, renamed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              color="blue"
              className="py-3 px-6"
            >
              Go Back
            </Button>
            
            <Link href="/en/knowledges" passHref>
              <Button
                variant="filled"
                color="blue"
                className="py-3 px-6"
              >
                Browse Knowledge
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <FooterLight />
    </div>
  );
} 