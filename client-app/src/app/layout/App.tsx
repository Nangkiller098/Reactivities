import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import LoadingComponent from "./LoadingComponent";
import { Activities } from "../../models/Activities";
import agent from "../api/agents";
import NavBar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

//create value
function App() {
  // const { activityStore } = useStore();
  const [activities, setActivities] = useState<Activities[]>([]);
  const [selectedActivity, setSelectActivity] = useState<
    Activities | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [Loading, setloading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // get data from api using axios by url
  useEffect(() => {
    agent.Activities.list().then((response) => {
      // let activities: Activity[] = [];
      // response.forEach((activity) => {
      //   activity.date = activity.date.split("T")[0];
      //   // activity.date = new Date().toLocaleDateString();
      // });
      setActivities(response);
      setloading(false);
    });
  }, []);

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
  if (Loading) return <LoadingComponent content="Loading app" />;
  return (
    <div>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        {/* <h2>{activityStore.title}</h2> */}
        <ActivityDashboard
          activities={activities}
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

export default App;
