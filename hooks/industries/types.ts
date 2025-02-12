export interface Industry {
  id: number;
  name: string;
  slug: string;
  children?: Industry[];
  topic?: Topic[];
}

export interface Topic {
  id: number;
  name: string;
  slug: string;
}

export type IndustryType = 'report' | 'insight' | 'data' | 'manual' | 'course';
