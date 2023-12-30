import { Grid } from "semantic-ui-react";
import { Activities } from "../../../models/Activities";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

//create interface for get data activities
interface Props {
  activities: Activities[];
  selectedActivity: Activities | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
}

//{activities} as paramameter extent from Props activities
export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
}: Props) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width={"6"}>
        {selectedActivity && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
          />
        )}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
}
