import { useEffect, useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { Activities } from "../../../models/Activities";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextinput from "../../../app/api/common/form/MyTextinput";
import MyTextArea from "../../../app/api/common/form/MyTextArea";
import MySelectInput from "../../../app/api/common/form/MySelectInput";
import { categoryOptions } from "../../../app/api/common/options/categoryOptions";
import MyDateInput from "../../../app/api/common/form/MyDateInput";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams();

  const [activity, setActivity] = useState<Activities>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity titile is require"),
    description: Yup.string().required("The activity description is require"),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;
  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextinput placeholder={"Title"} name={"title"} />
            <MyTextArea placeholder="Description" name="description" row={3} />
            <MySelectInput
              placeholder="Category"
              name="category"
              options={categoryOptions}
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d,yyyy h:mm aa"
            />
            <MyTextinput placeholder="City" name="city" />
            <MyTextinput placeholder="Venue" name="venue" />
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              positive
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
