import { FieldValues, FieldPath } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { ControllerProps } from 'react-hook-form';
import { FormFieldContext } from './FormFieldContext';

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export { FormField };
