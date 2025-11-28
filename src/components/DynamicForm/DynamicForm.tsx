import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Alert, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { DynamicFormProps, FormField } from './types';

function renderField(field: FormField, control: any, errors: Record<string, unknown>) {
  const name = field.name;
  const error = (errors as any)[name];
  const rules = field.validation ?? {};

  switch (field.type) {
    case 'text':
    case 'password':
    case 'number':
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={field.defaultValue ?? ''}
          render={({ field: rhfField }) => (
            <TextField
              {...rhfField}
              type={field.type === 'number' ? 'number' : field.type === 'password' ? 'password' : 'text'}
              label={field.label}
              fullWidth
              error={Boolean(error)}
              helperText={((error as any)?.message ?? (error ? 'Invalid value' : undefined)) || field.helperText}
              {...field.textFieldProps}
            />
          )}
        />
      );

    case 'checkbox':
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={Boolean(field.defaultValue)}
          render={({ field: rhfField }) => (
            <FormControl error={Boolean(error)}>
              <FormControlLabel
                control={<Checkbox checked={Boolean(rhfField.value)} onChange={(e) => rhfField.onChange(e.target.checked)} />}
                label={field.label}
              />
              <FormHelperText>{(error as any)?.message || field.helperText}</FormHelperText>
            </FormControl>
          )}
        />
      );

    case 'radio':
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={field.defaultValue ?? ''}
          render={({ field: rhfField }) => (
            <FormControl error={Boolean(error)}>
              <FormLabel>{field.label}</FormLabel>
              <RadioGroup
                value={rhfField.value}
                onChange={(e) => rhfField.onChange((e.target as HTMLInputElement).value)}
              >
                {(field.options ?? []).map((opt) => (
                  <FormControlLabel key={`${name}-${String(opt.value)}`} value={String(opt.value)} control={<Radio />} label={opt.label} />
                ))}
              </RadioGroup>
              <FormHelperText>{(error as any)?.message || field.helperText}</FormHelperText>
            </FormControl>
          )}
        />
      );

    case 'dropdown':
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={field.defaultValue ?? ''}
          render={({ field: rhfField }) => (
            <FormControl fullWidth error={Boolean(error)}>
              <FormLabel sx={{ mb: 0.5 }}>{field.label}</FormLabel>
              <Select value={String(rhfField.value ?? '')} onChange={(e) => rhfField.onChange((e.target as HTMLInputElement).value)} displayEmpty>
                {(field.options ?? []).map((opt) => (
                  <MenuItem key={`${name}-${String(opt.value)}`} value={String(opt.value)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{(error as any)?.message || field.helperText}</FormHelperText>
            </FormControl>
          )}
        />
      );

    case 'date':
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={field.defaultValue ?? null}
          render={({ field: rhfField }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={field.label}
                value={rhfField.value as any}
                onChange={(val) => rhfField.onChange(val)}
              />
            </LocalizationProvider>
          )}
        />
      );

    default:
      return null;
  }
}

export default function DynamicForm<T extends Record<string, unknown>>(props: DynamicFormProps<T>) {
  const { fields, onSubmit, submitLabel, initialValues, submitting, errorMessage, layout } = props;

  const defaultValues = useMemo(() => {
    const acc: Record<string, unknown> = {};
    fields.forEach((f) => {
      acc[f.name] = f.defaultValue ?? (f.type === 'checkbox' ? false : f.type === 'date' ? null : '');
    });
    return { ...acc, ...(initialValues ?? {}) } as Record<string, unknown>;
  }, [fields, initialValues]);

  const { control, handleSubmit, formState: { errors } } = useForm<Record<string, unknown>>({
    defaultValues,
  });

  return (
    <Box component="form" className='dynamic-form' onSubmit={handleSubmit((v) => onSubmit(v as T))} sx={{ display: 'block' }}>
      <Box sx={{ display: layout === 'stack' ? 'flex' : 'grid', flexDirection: layout === 'stack' ? 'column' : undefined, gap: 2 }}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {fields.map((field) => (
          <Box key={field.name}>{renderField(field, control, errors as any)}</Box>
        ))}
        <Button type="submit" variant="contained" disabled={submitting}>{submitLabel ?? 'Submit'}</Button>
      </Box>
    </Box>
  );
}
