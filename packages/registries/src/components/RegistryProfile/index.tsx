import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import { useStore } from "registries/src/store";

import { PROFILE_DEFAULTS, ROWS_PER_PAGE_OPTIONS } from "./constants";

import { CardResponse } from "../types";
import { Profile } from "./types";

function RegistryProfile() {
  const columns: Array<keyof Profile> = ["name", "country", "email"];

  const {
    state: { data, items },
    pagination: { page, onPageChange, onRowsPerPageChange, rowsPerPage },
  } = useStore<CardResponse<Profile>>("profiles", PROFILE_DEFAULTS);

  function handleRoute(id: string) {
    const bc = new BroadcastChannel("route");
    bc.postMessage({ to: id, relevant: true });
    bc.close();
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={`table_head_${index}`}
                  align="center"
                  sx={{ fontWeight: 600 }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={`table_row_${rowIndex}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={`table_cell_${rowIndex}_${colIndex}`}
                    onClick={() => handleRoute(row.id)}
                  >
                    {row[column] ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={items}
          onPageChange={onPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </TableContainer>
    </>
  );
}

export default RegistryProfile;
