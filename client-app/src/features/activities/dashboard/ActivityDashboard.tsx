import { Grid } from "semantic-ui-react";
import { Activities } from "../../../models/Activities";
import ActivityList from "./ActivityList";

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
    </Grid>
  );
}
