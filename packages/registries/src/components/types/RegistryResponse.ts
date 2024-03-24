export interface RegistryMeta {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
}

export interface CardResponse<Data extends Record<string, any>>
  extends RegistryMeta {
  data: Data[];
}
