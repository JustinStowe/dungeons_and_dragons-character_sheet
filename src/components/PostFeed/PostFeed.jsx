import React from "react";
import { Card, Loader, Dimmer, Segment, Image } from "semantic-ui-react";
import { PostCard } from "../PostCard/PostCard";

export function PostFeed({
  posts,
  numPhotosCol,
  isProfile,
  loading,
  user,
  addLike,
  removeLike,
}) {
  return (
    <Card.Group itemsPerRow={numPhotosCol} stackable>
      {loading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader size="small">Loading</Loader>
          </Dimmer>
          <Image src="https://react/semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : null}
      {posts.map((post) => {
        return (
          <PostCard
            posts={posts}
            key={post._id}
            isProfile={isProfile}
            user={user}
            removeLike={removeLike}
            addLike={addLike}
          />
        );
      })}
    </Card.Group>
  );
}
