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
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activities) => void;
  deleteActivity: (id: string) => void;
}

//{activities} as paramameter extent from Props activities
export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  createOrEdit,
  deleteActivity,
}: Props) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList 
        activities={activities} 
        selectActivity={selectActivity}
        deleteActivity={deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={"6"}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            closeForm={closeForm}
            activity={selectedActivity}
            createOrEdit={createOrEdit}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
