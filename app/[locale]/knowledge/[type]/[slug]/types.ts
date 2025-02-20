export interface KnowledgeDetails {
  id?: number;
  type: string;
  title: string;
  slug: string;
  description: string;
  isic_code: {
    id: number;
    key: number;
    name: string;
  };
  hs_code: any;
  language: string;
  total_price: string;
  countries: Array<{
    id: number;
    name: string;
    flag: string;
  }>;
  regions: any[];
  economic_blocs: any[];
  status: string;
  published_at: string;
  review: Array<{
    id: number;
    rate: number;
    comment: string;
    user_name: string;
    created_date: string;
  }>;
  is_review?: boolean;
  insighter: {
    name: string;
    profile_photo_url: string;
    roles: string[];
  };
  documents: Array<{
    id: number;
    file_name: string;
    file_size: number;
    file_extension: string;
    price: string;
    description: string | null;
    table_of_content: Array<{
      chapter: {
        title: string;
      };
    }>;
  }>;
}
