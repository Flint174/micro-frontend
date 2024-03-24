import { DB_URL } from "../constants";

import { GetParams, PostParams, RequestParams } from "./types";

export default class Api<Data extends Record<string, any>> {
  private path: string;

  constructor(path: string) {
    this.path = `${DB_URL}/${path}`;
  }

  async get(params?: GetParams) {
    return await this.fetch(params, { method: "GET" });
  }

  async post({ params, body }: PostParams) {
    return await this.fetch(params, { method: "POST", body });
  }

  async fetch(params?: RequestParams, requestInit?: RequestInit) {
    const queryParams = Object.assign(
      {},
      ...Object.entries(params ?? {}).map(([key, value]) => ({
        [key]: String(value),
      }))
    );
    const query = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${this.path}?${query}`, requestInit);

    if (!response.ok) {
      throw new Error("Not ok");
    }

    return (await response.json()) as Data;
  }
}
