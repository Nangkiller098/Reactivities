/**
 * The `MyDateInput` function is a custom input component for a date picker in a TypeScript React
 * application that uses Formik and Semantic UI React.
 * @param props - The `props` parameter is an object that contains any additional props that you want
 * to pass to the `MyDateInput` component. These props will be spread onto the `DatePicker` component.
 * @returns The MyDateInput component is returning a Form.Field component from the semantic-ui-react
 * library. Inside the Form.Field component, there is a DatePicker component from the react-datepicker
 * library. If the field has been touched and there is an error, a Label component with a basic red
 * color is displayed.
 */
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
