export interface MappingEntry {
  'Discord Role': string
  'Credit': string
}

export type Mapping = Record<string, { credit: string, i: number }>;
