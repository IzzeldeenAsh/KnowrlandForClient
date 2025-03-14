import { redirect } from 'next/navigation';

// This function helps with redirection
export default function FilterKnowledgesPage({
  params,
}: {
  params: {
    locale: string;
    taxonomy: string;
    id: string;
    type: string;
  };
}) {
  const { locale, taxonomy, id, type } = params;
  
  // Redirect to the new simplified page with query parameters
  redirect(`/${locale}/knowledges?taxonomy=${taxonomy}&id=${id}&type=${type}`);
}
