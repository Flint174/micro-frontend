import { CardResponse } from "../types";
import { Profile } from "./types";

export const ROWS_PER_PAGE_OPTIONS: number[] = [10, 20, 50];

export const PROFILE_DEFAULTS: CardResponse<Profile> = {
  data: [],
  first: 0,
  items: 0,
  last: 0,
  next: null,
  pages: 0,
  prev: null,
};
