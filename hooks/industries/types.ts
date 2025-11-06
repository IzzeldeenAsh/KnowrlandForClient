export interface Topic {
  id: number;
  name: string;
  slug: string;
  weight?: number;
  industry?: {
    id: number;
    name: string;
    slug: string;
    weight: number;
  };
}

export interface IndustryChild {
  id: number;
  name: string;
  slug: string;
  weight: number;
  topic: Topic[];
}

export interface Industry {
  id: number;
  name: string;
  slug: string;
  children?: IndustryChild[];
  topic?: Topic[];
  icon?: string;
  weight?: number;
}

export interface IndustryDetails extends Industry {
  children: IndustryChild[];
}

export interface Knowledge {
  id: number;
  type: string;
  title: string;
  slug: string;
}

export interface TopicWithKnowledge extends Topic {
  knowledge: Knowledge[];
}

export interface SubIndustryDetails {
  id: number;
  name: string;
  slug: string;
  weight: number;
  topic: TopicWithKnowledge[];
}

export interface TopicKnowledge {
  id: number;
  type: string;
  title: string;
  slug: string;
  insighter: {
    name: string;
    profile_photo_url: string;
  };
  published_at: string;
  total_price: string;
}

export interface TopicDetails {
  id: number;
  name: string;
  slug: string;
  knowledge: TopicKnowledge[];
}

export type IndustryType = 'report' | 'insight' | 'data' | 'manual' | 'course' | 'statistic';
