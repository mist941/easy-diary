import * as React from 'react';

interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

export { FormItemContext };
