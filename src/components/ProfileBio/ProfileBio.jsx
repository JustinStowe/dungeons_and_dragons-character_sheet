import React, { useState } from "react";
import { Image, Grid, Segment } from "semantic-ui-react";
import userService from "../../utilities/userService";
export function ProfileBio({ user, updateUser }) {
  const [bio, setBio] = useState("");
  async function submitHandler() {
    console.log("click! goes the submit button");
    console.log("This is the bio:", bio);
    const data = await userService.updateBio(bio);
    console.log("this is the data:", data);
    updateUser({
      ...user,
      bio: bio,
    });
    console.log("This is the updated user:", user);
  }
  function handleChange(e) {
    const { value } = e.target;
    setBio(value);
  }

  return (
    <Grid textAlign="center" columns={2} className="Profile">
      <Grid.Row>
        <Grid.Column>
          <Image
            src={`${
              user.photoUrl
                ? user.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }`}
            avatar
            size="small"
          />
        </Grid.Column>
        <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
          <Segment vertical>
            <h3>{user.username}</h3>
          </Segment>
          <Segment>
            <span> Bio: </span>
            <form>
              <input
                placeholder={user.bio}
                type="text"
                onChange={handleChange}
                value={bio}
              />
            </form>
            <button onClick={submitHandler}>SAVE</button>
            <h4>{user.bio ? user.bio : "no bio yet"}</h4>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
