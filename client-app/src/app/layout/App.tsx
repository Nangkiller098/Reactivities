import { useEffect, useState } from "react";

import axios from "axios";
import { Container, Header } from "semantic-ui-react";
import { Activities } from "../../models/Activities";
import NavBar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activities[]>([]);
  useEffect(() => {
    axios
      .get<Activities[]>("http://localhost:5000/api/Activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Header as="h2" icon="users" content="Reactivities" />
        
        {/* passing data from axios to the function */}
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  );
}

export default App;
