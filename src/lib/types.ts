export interface CoverageItem {
  text: string;
  example: string;
}

export interface ExclusionItem extends CoverageItem {
  note?: string;
}

export interface Product {
  title: string;
  description: string;
  coverages: CoverageItem[];
  extensions?: string[];
  exclusions?: ExclusionItem[];
  products?: never[];
  keywords?: string[];
  level: 'base' | 'ultime';
  examples?: string[];
}

export interface Profile {
  id: string;
  title: string;
  detailedDescription: string;
  products: Product[];
  imageUrl?: string;
  keywords?: string[];
}

export interface Family {
  id: string;
  title: string;
  description: string;
  profiles: Profile[];
}