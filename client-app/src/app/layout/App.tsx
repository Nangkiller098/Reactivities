import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Header } from "semantic-ui-react";
import { Activities } from "../../models/Activities";
import NavBar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

export function App() {
  const [activities, setActivities] = useState<Activities[]>([]);

  // for selete view to view or edit form activity
  const [selectedActivity, setSelectActivity] = useState<
    Activities[] | undefined
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

  function handleSelectedActivity(id: string) {
    setSelectActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectActivity(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <Header as="h2" icon="users" content="Reactivities" />
        {/* passing data from axios to the function */}
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
        />
      </Container>
    </>
  );
}
