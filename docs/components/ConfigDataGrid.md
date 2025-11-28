# ConfigDataGrid

A configurable data grid built on MUI `Table`, supporting Add / Edit / Delete actions via callbacks.

## Props
- `title?: string` Title displayed above the table.
- `columns: ColumnDef<T>[]` Column definitions with `key`, `header`, optional `width`, and optional `render(row)`.
- `rows: T[]` Array of data items.
- `getRowId(row): string | number` Function to get a stable row key.
- `onAdd?(): void` Callback for Add button.
- `onEdit?(row: T): void` Callback for per-row Edit.
- `onDelete?(row: T): void` Callback for per-row Delete.
- `actionsLabel?: string` Header label for the actions column.

## ColumnDef
```ts
export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  width?: number | string;
  render?: (row: T) => React.ReactNode;
}
```

## Basic Usage
```tsx
import ConfigDataGrid from '@/components/DataGrid/ConfigDataGrid';

type User = { id: number; name: string; email: string };

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
];

const rows: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

function onAdd() { /* open create dialog */ }
function onEdit(row: User) { /* open edit dialog */ }
function onDelete(row: User) { /* confirm and delete */ }

<ConfigDataGrid<User>
  title="Users"
  columns={columns}
  rows={rows}
  getRowId={(r) => r.id}
  onAdd={onAdd}
  onEdit={onEdit}
  onDelete={onDelete}
/>
```

## Notes
- Use `render(row)` for custom cell content such as chips or action links.
- When `rows` is empty, a friendly "No data" message is shown.
- Actions column appears only if `onEdit` or `onDelete` is provided.
