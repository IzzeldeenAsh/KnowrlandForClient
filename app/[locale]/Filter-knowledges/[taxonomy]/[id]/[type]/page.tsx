import { useKnowledge } from '@/hooks/knowledgs/useKnowledge';
import { useAllIndustries } from '@/hooks/industries/useAllIndustries';
import FilterKnowledgesClient from './FilterKnowledgesClient';

// This function helps Next.js know about the dynamic routes during build
export async function generateStaticParams() {
  // List known taxonomies
  const taxonomies = ['industry', 'sub_industry', 'topic'];
  
  // List known knowledge types
  const knowledgeTypes = ['data', 'insight', 'manual', 'course', 'report'];
  
  // You can either fetch all possible IDs from your API or define some initial ones
  // For example, if you know industry ID 9 is important:
  const initialIds = ['9']; 
  
  // Generate combinations
  const params = [];
  
  for (const taxonomy of taxonomies) {
    for (const id of initialIds) {
      for (const type of knowledgeTypes) {
        // Add English locale as default
        params.push({
          locale: 'en',
          taxonomy,
          id,
          type
        });
      }
    }
  }
  
  return params;
}

export default function FilterKnowledgesPage() {
  // This is now a server component that renders the client component
  return <FilterKnowledgesClient />;
}
