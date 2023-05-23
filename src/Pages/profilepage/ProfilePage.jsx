import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {} from "../../utils/userService";
import * as likesApi from "../../utils/likesApi";

export function ProfilePage(props) {
  console.log("The recieved Props (line 12)", props);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { username } = useParams();

  useEffect(() => {
    getProfile();
  }, [username]);

  function updateUser(user) {
    setUser(user);
  }

  async function getProfile() {
    try {
      const data = await getProfile(username);
      setPosts(data.posts);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log("get Profile error:", error);
      setError(error.message);
    }
  }

  async function addLike(postId) {
    try {
      const data = await likesApi.create(postId);
      console.log("response from create like function", data);
      getProfile();
    } catch (error) {
      console.log("add like error:", error);
      setError(error.message);
    }
  }

  async function removeLike(likesId) {
    try {
      const data = await likesApi.removeLike(likesId);
      console.log("remove like response:", data);
      getProfile(false);
    } catch (error) {
      console.log("remove like error:", error);
      setError(error.message);
    }
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid celled container stackable>
      <Grid.Row columns={1}>
        <Grid.Column>
          <ProfileBio updateUser={updateUser} user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>{props.user.bio && props.user.bio}</Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column style={{ maxWidth: 750 }}>
          <PostFeed
            isProfile={true}
            posts={posts}
            numPhotosCol={3}
            user={props.user}
            addLike={addLike}
            removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
