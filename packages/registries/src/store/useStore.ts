import { useEffect, useMemo, useState } from "react";

import { Api, GetParams, PostParams } from "./api";

import { ROWS_PER_PAGE_OPTIONS } from "../components/RegistryProfile/constants";

function useStore<Data extends Record<string, any>>(
  path: string,
  defaultValues: Data
) {
  const [state, setState] = useState<Data>(defaultValues);
  const [pending, setPending] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  useEffect(() => {
    api.get({ _page: page + 1, _per_page: rowsPerPage });
  }, [api, page, rowsPerPage]);

  return {
    state,
    pending,
    pagination: {
      page,
      onPageChange: handleChangePage,
      rowsPerPage,
      onRowsPerPageChange: handleChangeRowsPerPage,
    },
    api,
  };
}

export default useStore;
