export interface User {
  uuid?: string;
  name: string;
  first_name: string;
  last_name: string;
  email?: string;
  profile_image?: string;
  profile_photo_url?: string;
}

export interface Question {
  id: number;
  question: {
    question: string;
    question_date: string;
    user: User;
  };
  answer: {
    answer: string | null;
    answer_date: string | null;
    user: User;
  };
  is_owner?: boolean;
  knowledge: {
    id: number;
    type: string;
    title: string;
    slug: string;
    description: string;
    language: string;
    published_at: string;
    status: string;
    insighter: {
      id: number;
      uuid: string;
      phone: string;
      bio: string;
      status: string;
      user?: {
        id: number;
        name: string;
        email: string;
        first_name: string;
        last_name: string;
        profile_photo?: {
          url: string;
        };
      };
    };
  };
  children: Question[];
}

export interface KnowledgeDetails {
  id?: number;
  type: string;
  title: string;
  slug: string;
  description: string;
  // Overall purchase status for the knowledge
  purchased_status?: 'non-purchased' | 'purchased' | 'partial-purchased';
  isic_code: {
    id: number;
    key: number;
    name: string;
  } | null;
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
  questions?: Question[];
  is_owner?: boolean;
  insighter: {
    name: string;
    profile_photo_url: string;
    uuid: string;
    roles: string[];
    company?: {
      legal_name: string;
      logo: string;
      uuid: string;
    };
  };
  documents: Array<{
    id: number;
    file_name: string;
    file_size: number;
    file_extension: string;
    price: string;
    description: string | null;
    // Whether this specific document was purchased by current user
    is_purchased?: boolean;
    table_of_content: Array<{
      chapter: {
        title: string;
      };
    }>;
  }>;
}
