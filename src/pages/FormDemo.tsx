import DynamicForm from '../components/DynamicForm/DynamicForm';
import type { FormField } from '../components/DynamicForm/types';
import { Box, Typography } from '@mui/material';

export default function FormDemo() {
  const fields: FormField[] = [
    { name: 'fullName', label: 'Full Name', type: 'text', validation: { required: 'Name is required' } },
    { name: 'age', label: 'Age', type: 'number', validation: { min: 1, max: 120 } },
    { name: 'agree', label: 'Agree to Terms', type: 'checkbox', defaultValue: false },
    { name: 'gender', label: 'Gender', type: 'radio', options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ]
    },
    { name: 'country', label: 'Country', type: 'dropdown', options: [
        { label: 'USA', value: 'us' },
        { label: 'China', value: 'cn' },
        { label: 'Japan', value: 'jp' },
      ]
    },
    { name: 'birthday', label: 'Birthday', type: 'date' },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Dynamic Form Demo</Typography>
      <DynamicForm
        fields={fields}
        onSubmit={(values) => {
          // eslint-disable-next-line no-console
          console.log('Submitted:', values);
        }}
        submitLabel="Save"
      />
    </Box>
  );
}
