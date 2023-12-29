import { Grid } from "semantic-ui-react";
import { Activities } from "../../../models/Activities";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";

//create interface for get data activities
interface Props {
  activities: Activities[];
}

//{activities} as paramameter extent from Props activities
export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} />
      </Grid.Column>
      <Grid.Column width={"6"}>
        <ActivityDetails activity={activities[0]} />
      </Grid.Column>
    </Grid>
  );
}
