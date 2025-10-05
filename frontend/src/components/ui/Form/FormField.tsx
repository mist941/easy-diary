import {
  FieldValues,
  FieldPath,
  ControllerProps,
  Controller,
} from 'react-hook-form';
import { FormFieldContext } from './FormFieldContext';

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

export { FormField };
