import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import { Profile } from "../../models/profile";
import { useStore } from "../../app/stores/store";
import { useState } from "react";
import PhotoUploadWidget from "../../app/api/common/imageUpload/PhotoUploadWidget";

interface Props {
  profile: Profile;
}

export default function ProfilePhoto({ profile }: Props) {
  const {
    profileStore: { isCurrentUser, uploadPhoto, uploading },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon={"image"} content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={uploading}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
