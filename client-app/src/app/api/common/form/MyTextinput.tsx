/**
 * The above code is a TypeScript React component that renders a text input field with error handling
 * using Formik and Semantic UI React.
 * @param {Props} props - The `props` parameter is an object that contains the following properties:
 * @returns The MyTextinput component is returning a Form.Field component from the semantic-ui-react
 * library. Inside the Form.Field component, there is a label element, an input element, and a
 * conditional rendering of a Label component if there is a validation error. The input element is
 * spread with the field and props objects, which allows the component to work with Formik's
 * useFormikContext hook.
 */
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
}

export default function MyTextinput(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.initialError}>
      <label htmlFor="">{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
