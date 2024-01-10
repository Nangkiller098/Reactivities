import { ErrorMessage, Form, Formik } from "formik";
import MyTextinput from "../../app/api/common/form/MyTextinput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch(() => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to Reactivites"
            color="teal"
            textAlign="center"
          />
          <MyTextinput placeholder="Email" name="email" />
          <MyTextinput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name={"error"}
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}
