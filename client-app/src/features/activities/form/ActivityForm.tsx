import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activities } from "../../../models/Activities";

interface Props {
  activity: Activities | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activities) => void;
  submitting: boolean;
}
export default function ActivityForm({
  activity: selectedActivity,
  closeForm,
  createOrEdit,
  submitting,
}: Props) {
  //const is use for make a variable constant and cannnot be changed
  const initiaState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };
  const [activity, setActivity] = useState(initiaState);

  function handleSubmit() {
    createOrEdit(activity);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          // type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={closeForm}
          floated="right"
          positive
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
