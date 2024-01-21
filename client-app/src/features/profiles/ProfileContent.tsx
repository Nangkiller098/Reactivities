import { Tab } from "semantic-ui-react";
import ProfilePhoto from "./ProfilePhoto";
import { Profile } from "../../models/profile";

interface Props {
  profile: Profile;
}

export default function ProfielContent({ profile }: Props) {
  const panes = [
    { menuItem: "About", render: () => <Tab.Pane>About Content</Tab.Pane> },
    {
      menuItem: "Photos",
      render: () => (
        <Tab.Pane>
          <ProfilePhoto profile={profile} />
        </Tab.Pane>
      ),
    },
    { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers Content</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following Content</Tab.Pane>,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
}
