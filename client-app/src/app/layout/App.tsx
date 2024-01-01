import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

//create value
function App() {
  const { activityStore } = useStore();
  // get data from api using axios by url
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  //loading gif
  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;
  return (
    <div>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </div>
  );
}

export default observer(App);
