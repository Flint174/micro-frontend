import { useEffect, useMemo, useState } from "react";

import { Api, GetParams, PostParams } from "./api";

function useStore<Data extends Record<string, any>>(
  path: string,
  defaultValues: Data
) {
  const [state, setState] = useState<Data>(defaultValues);
  const [pending, setPending] = useState(false);

  const api = useMemo(() => {
    const api = new Api<Data>(path);

    const get = async (params?: GetParams) => {
      setPending(true);
      try {
        const response = await api.get(params);
        setState(response);
      } catch (error) {
        console.error(error);
      }
      setPending(false);
    };

    const post = async (params: PostParams) => {
      setPending(true);
      try {
        const response = await api.post(params);
        setState(response);
      } catch (error) {
        console.error(error);
      }
      setPending(false);
    };

    return { get, post };
  }, [path]);

  useEffect(() => {
    api.get();
  }, [api]);

  return {
    state,
    pending,
    api,
  };
}

export default useStore;
