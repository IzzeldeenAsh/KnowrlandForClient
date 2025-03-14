'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Client component page that handles redirect
export default function FilterKnowledgesPage() {
  const params = useParams();
  const router = useRouter();
  
  // Extract the parameters
  const locale = params.locale as string;
  const taxonomy = params.taxonomy as string;
  const id = params.id as string;
  const type = params.type as string;
  
  // Use useEffect to trigger the redirect on the client side
  useEffect(() => {
    router.replace(`/${locale}/knowledges?taxonomy=${taxonomy}&id=${id}&type=${type}`);
  }, [router, locale, taxonomy, id, type]);
  
  // Show a loading message while redirecting
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Redirecting to filter page...</p>
    </div>
  );
}
