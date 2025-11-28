import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ConfigDataGrid from '../../components/DataGrid/ConfigDataGrid';

type User = { id: number; name: string; email: string };

export default function DataGridDemo() {
  const [rows, setRows] = useState<User[]>([
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ]);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
  ];

  const onAdd = () => {
    const nextId = (rows.at(-1)?.id ?? 0) + 1;
    const newUser = { id: nextId, name: `User ${nextId}`, email: `user${nextId}@example.com` };
    setRows((prev) => [...prev, newUser]);
  };

  const onEdit = (row: User) => {
    const updated = { ...row, name: row.name + ' (edited)' };
    setRows((prev) => prev.map((r) => (r.id === row.id ? updated : r)));
  };

  const onDelete = (row: User) => {
    setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h4">ConfigDataGrid Demo</Typography>
        <ConfigDataGrid<User>
          title="Users"
          columns={columns}
          rows={rows}
          getRowId={(r) => r.id}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Stack>
    </Box>
  );
}
