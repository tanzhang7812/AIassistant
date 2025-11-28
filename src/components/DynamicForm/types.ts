export type FieldType =
  | 'text'
  | 'password'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'dropdown'
  | 'date';

export interface OptionItem {
  label: string;
  value: string | number;
}

export interface FieldValidation {
  required?: boolean | string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

// Base form field config. Additional UI fine-tuning can be passed via componentProps
// for text-like fields.
export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  defaultValue?: string | number | boolean | Date | null;
  options?: OptionItem[]; // for radio & dropdown
  validation?: FieldValidation;
  helperText?: string;
  // Extra props forwarded to MUI TextField for text/password/number types.
  // Deliberately narrow to avoid conflicting controlled props.
  textFieldProps?: Partial<Pick<
    import('@mui/material').TextFieldProps,
    | 'autoComplete'
    | 'placeholder'
    | 'size'
    | 'variant'
    | 'disabled'
    | 'margin'
    | 'InputProps'
    | 'inputProps'
  >>;
}

export interface DynamicFormProps<T extends Record<string, unknown>> {
  fields: FormField[];
  onSubmit: (values: T) => void | Promise<void>;
  submitLabel?: string;
  // Override or extend default field defaults.
  initialValues?: Partial<T>;
  // Loading state for submit button.
  submitting?: boolean;
  // Optional top-level error message area.
  errorMessage?: string;
  // Layout strategy; default grid.
  layout?: 'grid' | 'stack';
}

// Helper generic to derive value object type from field list if desired externally.
export type InferFormValues<F extends readonly FormField[]> = {
  [K in F[number]['name']]: unknown;
};
