export type RequestParams = Record<string, string | number>;

export type RequestBody = RequestInit["body"];

export type GetParams = RequestParams;

export interface PostParams {
  body: RequestBody;
  params?: RequestParams;
}
