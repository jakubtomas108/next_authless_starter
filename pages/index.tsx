import React from "react";
import { useState } from "react";

import { mock } from "../lib/mock";

import { Comment } from "../components/Comment";
import { Box, VStack, Button, Input, Grid } from "@chakra-ui/react";
import { useEffect } from "react";

export const Index: React.FC = () => {
  // Declaring local state
  const [comments, setComments] = useState(mock);
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const createComment = () => {
    const newComments = [
      ...comments,
      { id: String(comments.length + 1), content, email },
    ];

    // Creating new comment
    setComments(newComments);

    // Resetting the input values after the comment is created
    setEmail("");
    setContent("");

    // Saving the comments to "database" (localStorage)
    localStorage.setItem("comments", JSON.stringify(newComments));
  };

  useEffect(() => {
    const _comments = localStorage.getItem("comments");

    // Save comments from "database" to our local state
    if (_comments) {
      setComments(JSON.parse(_comments));
    }
  }, []);

  return (
    <Box w="800px" m="auto">
      <VStack mb={12}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </VStack>

      {/* New comment form */}
      <Grid gap={4} templateColumns="6fr 6fr 2fr" align="center">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your comment"
        />
        <Button onClick={createComment}>Submit</Button>
      </Grid>
    </Box>
  );
};

export default Index;
