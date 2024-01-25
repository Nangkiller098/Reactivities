import ProfielContent from "./ProfileContent";

import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import { observer } from "mobx-react-lite";

export default observer(function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { profileStore } = useStore();
  const { loadingProfile, loadProfile, profile, setActiveTab } = profileStore;

  useEffect(() => {
    if (username) loadProfile(username);
    return () => {
      setActiveTab(0);
    };
  }, [loadProfile, setActiveTab, username]);

  if (loadingProfile) return <LoadingComponent content="Loading Profile ..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            <ProfileHeader profile={profile} />
            <ProfielContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
});
