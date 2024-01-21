import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Form, Formik } from "formik";
import MyTextinput from "../../app/api/common/form/MyTextinput";
import MyTextArea from "../../app/api/common/form/MyTextArea";
import { Button } from "semantic-ui-react";
interface Props {
  setEditMode: (editMode: boolean) => void;
}
export default observer(function ProfileEditForm({ setEditMode }: Props) {
  const {
    profileStore: { updateProfile, profile },
  } = useStore();
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) => {
        updateProfile(values).then(() => {
          setEditMode(false);
        });
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextinput placeholder={"DisplayName"} name={"displayName"} />
          <MyTextArea placeholder={"Bio"} name={"bio"} row={3} />
          <Button
            positive
            type="submit"
            loading={isSubmitting}
            content="Update Profile"
            floated="right"
            disabled={isValid && !dirty}
          />
        </Form>
      )}
    </Formik>
  );
});
