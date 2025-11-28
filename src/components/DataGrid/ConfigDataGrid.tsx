import { useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Typography,
} from '@mui/material';

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  width?: number | string;
  render?: (row: T) => React.ReactNode;
}

export interface ConfigDataGridProps<T> {
  title?: string;
  columns: ColumnDef<T>[];
  rows: T[];
  getRowId: (row: T) => string | number;
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  actionsLabel?: string;
}

export default function ConfigDataGrid<T>(props: ConfigDataGridProps<T>) {
  const { title, columns, rows, getRowId, onAdd, onEdit, onDelete, actionsLabel } = props;

  const hasActions = useMemo(() => Boolean(onEdit || onDelete), [onEdit, onDelete]);

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        {title ? (
          <Typography variant="h6">{title}</Typography>
        ) : <span />}
        {onAdd && (
          <Button variant="contained" onClick={onAdd}>Add</Button>
        )}
      </Stack>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.key)} sx={{ width: col.width }}>{col.header}</TableCell>
              ))}
              {hasActions && (
                <TableCell sx={{ width: 140 }}>{actionsLabel ?? 'Actions'}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={String(getRowId(row))}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </TableCell>
                ))}
                {hasActions && (
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {onEdit && (
                        <Button variant="outlined" size="small" onClick={() => onEdit(row)}>Edit</Button>
                      )}
                      {onDelete && (
                        <Button variant="outlined" color="error" size="small" onClick={() => onDelete(row)}>Delete</Button>
                      )}
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + (hasActions ? 1 : 0)}>
                  <Typography variant="body2" color="text.secondary">No data</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
