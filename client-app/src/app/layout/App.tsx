import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import LoadingComponent from "./LoadingComponent";
import { Activities } from "../../models/Activities";
import agent from "../api/agents";
import NavBar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

//create value
function App() {
  const { activityStore } = useStore();
  const [activities, setActivities] = useState<Activities[]>([]);
  const [selectedActivity, setSelectActivity] = useState<
    Activities | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // get data from api using axios by url
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  //Get data by Id
  function handleSelectedActivity(id: string) {
    setSelectActivity(activities.find((x) => x.id === id));
  }

  //cancel select data
  function handleCancelSelectActivity() {
    setSelectActivity(undefined);
  }

  //open form and get data
  function handleFormOpen(id?: string) {
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  //close form then remove data
  function handleFormClose() {
    setEditMode(false);
  }
  //creat or edit data
  function handleCreateOrEditActivity(activity: Activities) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
      });
    }
    setSelectActivity(activity);
    setEditMode(false);
    setSubmitting(false);
  }

  //delete data
  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  //loading gif
  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;
  return (
    <div>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </div>
  );
}

export default observer(App);
