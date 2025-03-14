import KnowledgesClient from './KnowledgesClient';

export const dynamic = 'force-dynamic';

export default function KnowledgesPage() {
  // This is a server component that renders the client component
  // Using force-dynamic to ensure the page responds to query parameters
  return <KnowledgesClient />;
} 