/**
 * The above code is a TypeScript React component that renders a textarea input field with error
 * handling and validation using Formik and Semantic UI React.
 * @param {Props} props - The `props` parameter is an object that contains the following properties:
 * @returns The MyTextArea component is returning a Form.Field component from the semantic-ui-react
 * library. Inside the Form.Field component, there is a label, a textarea input, and a conditional
 * rendering of a Label component if there is an error. The textarea input is spread with the field and
 * props objects, which include the necessary attributes and event handlers for formik integration.
 */
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  row: number;
  label?: string;
}

export default function MyTextArea(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.initialError}>
      <label>{props.label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
