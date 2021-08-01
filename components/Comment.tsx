import { useState } from "react";
import { CommentSpecs } from "../types";

import { Grid, Text } from "@chakra-ui/react";
import { sendVerificationLink } from "../lib/authless";

interface CommentProps {
  comment: CommentSpecs;
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const sendEditVerificationLink = async () => {
    // Explanation on the end of this file and in README.md
    const requestBody = {
      receiver: comment.email,
      target_id: comment.id,
      subject: "Edit your comment",
      html: `Hello ${comment.email}, if you want to edit Your comment, click on this <a href="{{link}}">link</a>`,
      redirect_url: "http://localhost:3000/edit",
    };

    try {
      // Sending the authentication email to user specified in requestBody
      const { success, error } = await sendVerificationLink(requestBody);

      if (success) alert("Authentication email was sent!");
      if (error) console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      w="100%"
      borderWidth={1}
      p={4}
      borderRadius="lg"
      templateColumns="8fr 1fr"
      gap={4}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <Text>{comment.content}</Text>
      {isMouseOver && (
        <Text cursor="pointer" onClick={sendEditVerificationLink}>
          Edit
        </Text>
      )}
    </Grid>
  );
};

// Explanation for the sendVerificationLink request body:

// This is the target email we want to send the authentication email to
// receiver: comment.email,

// ID of the comment we want to edit
// target_id: comment.id,

// Subject of the authentication email
// subject: "Edit your comment",

// Body of the authentication email in HTML. Don't forget to add the <a href="{{link}}">YOUR_ANCHOR_TEXT</a>. Authless will replace the {{link}} with the actual redirect link
// html: `Hello ${comment.email}, if you want to edit Your comment, click on this <a href="{{link}}">link</a>`,

// URL where the authentication can be handled. Notice how we are passing the ?action=edit to the URL. We want to have some way how to easily recognize what action we want to perform
// redirect_url: "http://localhost:3000/handleLogin?action=edit",
