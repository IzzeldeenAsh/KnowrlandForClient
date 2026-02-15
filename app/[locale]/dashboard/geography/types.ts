export type LocalizedText = {
  en?: string;
  ar?: string;
};

export type CountryRecord = {
  id: number;
  region_id: number | null;
  iso2: string | null;
  iso3: string | null;
  international_code: string | null;
  flag: string | null;
  name: string | null;
  names?: LocalizedText;
  nationality: string | null;
  nationalities?: LocalizedText;
  status: string | null;
};

export type RegionRecord = {
  id: number;
  name: string | null;
  names?: LocalizedText;
};

export type EconomicBlocRecord = {
  id: number;
  name: string | null;
  names?: LocalizedText;
};

