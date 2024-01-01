import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Header } from "semantic-ui-react";
import { Activities } from "../../models/Activities";
import NavBar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

export function App() {
  const [activities, setActivities] = useState<Activities[]>([]);

  // for selete view to view or edit form activity
  const [selectedActivity, setSelectActivity] = useState<
    Activities | undefined
  >(undefined);

  //edit mode
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activities[]>("http://localhost:5000/api/Activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  //selected activity on view button
  function handleSelectedActivity(id: string) {
    setSelectActivity(activities.find((x) => x.id === id));
  }

  //cancel seletect activity
  function handleCancelSelectActivity() {
    setSelectActivity(undefined);
  }

  //open form edit
  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  //close form edit
  function handleFormClose() {
    setEditMode(false);
  }

  //handle check create for edit mode
  function handleCreateOrEditActivity(activity: Activities) {
    //check data activite have or not if not replace by new activity
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : //uuid
        setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)]);
  }
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <Header as="h2" icon="users" content="Reactivities" />
        {/* passing data from axios to the function */}
        <ActivityDashboard
          activities={activities}
          //view activity
          selectedActivity={selectedActivity}
          //select and view activity
          selectActivity={handleSelectedActivity}
          //cancel
          cancelSelectActivity={handleCancelSelectActivity}
          //check user request edit or create activity
          editMode={editMode}
          //open form for edit or create activity
          openForm={handleFormOpen}
          //close form for edit or create activity
          closeForm={handleFormClose}
          //for checking create or edit mode if true set editmode(true) it not editmode(false)
          createOrEdit={handleCreateOrEditActivity}
          //delete activity
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}
