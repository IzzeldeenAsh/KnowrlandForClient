// Reducers for consolidated state management
import { SearchState, SearchAction, FilterState, FilterAction, UIState, UIAction } from '../types';

export const searchInitialState: SearchState = {
  query: '',
  type: 'knowledge',
  loading: false,
  results: [],
  totalPages: 1,
  totalItems: 0,
  currentPage: 1,
  statistics: [],
};

export const filterInitialState: FilterState = {
  language: 'all',
  country: null,
  region: null,
  economicBloc: null,
  industry: null,
  isicCode: null,
  hsCode: null,
  price: null,
  accuracy: 'all',
  role: 'all',
  category: 'all',
};

export const uiInitialState: UIState = {
  viewMode: 'grid',
  filtersVisible: true,
  filterDrawerOpen: false,
  activeTab: 'all',
  selectedCategory: 'all',
};

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    
    case 'SET_SEARCH_TYPE':
      return { 
        ...state, 
        type: action.payload,
        // Reset pagination when changing search type
        currentPage: 1,
        results: [],
        statistics: [],
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload.results,
        totalPages: action.payload.totalPages,
        totalItems: action.payload.totalItems,
      };
    
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_STATISTICS':
      return { ...state, statistics: action.payload };
    
    case 'RESET_SEARCH':
      return { ...searchInitialState, type: state.type };
    
    default:
      return state;
  }
}

export function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    
    case 'SET_COUNTRY':
      // Clear region and economic bloc when country is selected
      return { 
        ...state, 
        country: action.payload,
        region: null,
        economicBloc: null,
      };
    
    case 'SET_REGION':
      // Clear country and economic bloc when region is selected
      return { 
        ...state, 
        region: action.payload,
        country: null,
        economicBloc: null,
      };
    
    case 'SET_ECONOMIC_BLOC':
      // Clear country and region when economic bloc is selected
      return { 
        ...state, 
        economicBloc: action.payload,
        country: null,
        region: null,
      };
    
    case 'SET_INDUSTRY':
      return { ...state, industry: action.payload };
    
    case 'SET_ISIC_CODE':
      // Clear HS code when ISIC code changes
      return { 
        ...state, 
        isicCode: action.payload,
        hsCode: action.payload ? state.hsCode : null,
      };
    
    case 'SET_HS_CODE':
      return { ...state, hsCode: action.payload };
    
    case 'SET_PRICE':
      return { ...state, price: action.payload };
    
    case 'SET_ACCURACY':
      return { ...state, accuracy: action.payload };
    
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    
    case 'RESET_FILTERS':
      return filterInitialState;
    
    case 'SET_FILTERS':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

export function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    
    case 'TOGGLE_FILTERS':
      return { ...state, filtersVisible: !state.filtersVisible };
    
    case 'SET_FILTERS_VISIBLE':
      return { ...state, filtersVisible: action.payload };
    
    case 'SET_FILTER_DRAWER':
      return { ...state, filterDrawerOpen: action.payload };
    
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    
    default:
      return state;
  }
}