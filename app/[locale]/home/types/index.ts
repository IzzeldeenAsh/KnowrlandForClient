// Consolidated types for home page state management

export interface YearRange {
  startYear: number | null;
  endYear: number | null;
}

export interface SearchState {
  query: string;
  type: 'knowledge' | 'insighter';
  loading: boolean;
  results: any[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  statistics: StatisticsItem[];
}

export interface FilterState {
  language: 'all' | 'arabic' | 'english';
  country: number | null;
  region: number | null;
  economicBloc: number | null;
  industry: number | null;
  isicCode: string | null;
  hsCode: string | null;
  price: string | null;
  accuracy: 'any' | 'all';
  role: 'all' | 'company' | 'individual';
  category: string;
  yearOfStudy: YearRange | null;
}

export interface UIState {
  viewMode: 'grid' | 'list';
  filtersVisible: boolean;
  filterDrawerOpen: boolean;
  activeTab: string | null;
  selectedCategory: string | null;
}

export interface StatisticsItem {
  type: string | null;
  count: number;
}

export interface StatisticsResponse {
  data: StatisticsItem[];
}

// Action types for useReducer
export type SearchAction =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_SEARCH_TYPE'; payload: 'knowledge' | 'insighter' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_RESULTS'; payload: { results: any[]; totalPages: number; totalItems: number } }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_STATISTICS'; payload: StatisticsItem[] }
  | { type: 'RESET_SEARCH' };

export type FilterAction =
  | { type: 'SET_LANGUAGE'; payload: 'all' | 'arabic' | 'english' }
  | { type: 'SET_COUNTRY'; payload: number | null }
  | { type: 'SET_REGION'; payload: number | null }
  | { type: 'SET_ECONOMIC_BLOC'; payload: number | null }
  | { type: 'SET_INDUSTRY'; payload: number | null }
  | { type: 'SET_ISIC_CODE'; payload: string | null }
  | { type: 'SET_HS_CODE'; payload: string | null }
  | { type: 'SET_PRICE'; payload: string | null }
  | { type: 'SET_ACCURACY'; payload: 'any' | 'all' }
  | { type: 'SET_ROLE'; payload: 'all' | 'company' | 'individual' }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_YEAR_OF_STUDY'; payload: YearRange | null }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> };

export type UIAction =
  | { type: 'SET_VIEW_MODE'; payload: 'grid' | 'list' }
  | { type: 'TOGGLE_FILTERS' }
  | { type: 'SET_FILTERS_VISIBLE'; payload: boolean }
  | { type: 'SET_FILTER_DRAWER'; payload: boolean }
  | { type: 'SET_ACTIVE_TAB'; payload: string | null }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string | null };
