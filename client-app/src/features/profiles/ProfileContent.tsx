import { Tab } from "semantic-ui-react";
import ProfilePhoto from "./ProfilePhoto";
import { Profile } from "../../models/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowing from "./ProfileFollowing";
import { useStore } from "../../app/stores/store";
import ProfileActivities from "./ProfileActivities";

interface Props {
  profile: Profile;
}

export default function ProfielContent({ profile }: Props) {
  const { profileStore } = useStore();
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <Tab.Pane>
          <ProfileAbout />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Photos",
      render: () => (
        <Tab.Pane>
          <ProfilePhoto profile={profile} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Events",
      render: () => (
        <Tab.Pane>
          <ProfileActivities />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Followers",
      render: () => (
        <Tab.Pane>
          <ProfileFollowing />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Following",
      render: () => (
        <Tab.Pane>
          <ProfileFollowing />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(_, data) =>
        profileStore.setActiveTab(data.activeIndex as number)
      }
    />
  );
}
