import React, { useState, useEffect } from "react";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { PostFeed } from "../../components/PostFeed/PostFeed";
import { PostForm } from "../../components/PostForm/PostForm";
import * as postApi from "../../utilities/postApi";
import * as likesApi from "../../utilities/likesApi";
import { Grid } from "semantic-ui-react";
export function Feed(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function handleAddPost(post) {
    try {
      setLoading(true);
      const data = await postApi.create(post);
      console.log("Response from server in addPost:", data);
      setPosts([data.post, ...posts]);
      setLoading(false);
    } catch (error) {
      console.log("handleAddPost error:", error);
      setError(error.message);
    }
  }

  async function addLike(postId) {
    try {
      const data = await likesApi.create(postId);
      console.log("response from likesApi.create:", data);
      getPosts();
    } catch (error) {
      console.log("addLike error:", error);
      setError(error.message);
    }
  }

  async function removeLike(likesId) {
    try {
      const data = await likesApi.removeLike(likesId);
      console.log("response from likesApi.removeLike:", data);
      getPosts(false);
    } catch (error) {
      console.log("removeLike error:", error);
      setError(error.message);
    }
  }

  async function getPosts(showLoading) {
    try {
      showLoading ? setLoading(true) : setLoading(false);
      const data = await postsApi.getAll();
      setPosts([...data.posts]);
      setLoading(false);
    } catch (error) {
      console.log("getPosts error:", error);
      setError(error.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostForm handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostFeed
            posts={posts}
            isProfile={false}
            numPhotosCol={1}
            loading={loading}
            user={props.user}
            addLike={addLike}
            removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
