import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";

import { CommentSpecs } from "../types";

import { Text, Input, Grid, Button, Box } from "@chakra-ui/react";
import {
  closeSession,
  verifyCurrentTarget,
  verifySignature,
} from "../lib/authless";
import { GetServerSideProps } from "next";

interface EditProps {
  target_id: string;
  signature: string;
}

const Edit: React.FC<EditProps> = ({ target_id, signature }) => {
  const { query, replace } = useRouter();

  // Declaring local state
  const [comment, setComment] = useState({} as CommentSpecs);
  const [loading, setLoading] = useState(true);

  // Check if current comment is the same as target_id we specified with sendVerificationLink
  const validateTarget = async () => {
    const { error, success } = await verifyCurrentTarget(signature, comment.id);

    if (success) {
      return { success };
    }

    return { error };
  };

  const saveComment = async () => {
    // Checking if the edited comment is the correct one
    const { success, error } = await validateTarget();

    if (success) {
      const comments = JSON.parse(
        localStorage.getItem("comments")!
      ) as CommentSpecs[];

      // Edit the comments array
      const index = comments.findIndex((i) => i.id === comment.id);
      comments[index] = comment;
      localStorage.setItem("comments", JSON.stringify(comments));

      // Closing session right after the comment is edited
      await closeSession(signature);

      alert("Comment updated");
      // Navigate to main page
      replace("/");
    } else if (error) {
      alert(error);
      // Navigate to main page
      replace("/");
    }
  };

  // Updating the respective comment fields
  const updateField = (field: string, value: string) => {
    setComment({ ...comment, [field]: value });
  };

  useEffect(() => {
    // Getting the comments from "database" (localStorage)
    const comments = localStorage.getItem("comments");

    // Finding the comment we want to edit
    if (comments) {
      setComment(
        JSON.parse(comments).find((cmt: CommentSpecs) => cmt.id === target_id)
      );
      // Setting loading to false
      setLoading(false);
    }
  }, [target_id]);

  // Display the Loading text
  if (loading) {
    return <Text textAlign="center">Loading...</Text>;
  }

  // Display the layout for comment edit
  return (
    <Box w="800px" m="auto">
      <Text fontSize="xl">Edit your comment</Text>
      <Grid gap={4} templateColumns="6fr 6fr 2fr" align="center">
        <Input
          value={comment.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="Email"
        />
        <Input
          value={comment.content}
          onChange={(e) => updateField("content", e.target.value)}
          placeholder="Your comment"
        />
        <Button onClick={saveComment}>Save changes</Button>
      </Grid>
    </Box>
  );
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Destructuring the URL search query
  const { signature } = query;

  // Verifying the signature obtained from the URL
  const { success, target_id } = await verifySignature(signature as string);

  // If it is OK, return the user-related target_id and signature to the component
  if (success && target_id) {
    return { props: { target_id, signature } };
  }

  // If it is invalid, redirect the user to the Index page
  return { redirect: { destination: "/", permanent: false } };
};
