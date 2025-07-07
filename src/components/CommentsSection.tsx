import {
  Avatar,
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteComment } from "../app/slices/commentsSlice";
import AddComment from "./AddComment";

const CommentsSection = () => {
  const { comments, loading } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Flex justify="between">
        <Heading mb="4">Comments</Heading>
        <AddComment />
      </Flex>
      <Flex direction="column" gap="4">
        {comments.length === 0 && (
          <Callout.Root color="yellow">
            <Callout.Text>There are no comments yet</Callout.Text>
          </Callout.Root>
        )}
        {comments.length > 0 &&
          comments.map((comment) => (
            <Card key={comment.id}>
              <Flex justify="between" align="center">
                <Flex align="center" gap="3">
                  <Avatar fallback="U" radius="full" />
                  <Text>{comment.description}</Text>
                </Flex>
                <Box>
                  <Button
                    color="tomato"
                    variant="soft"
                    className="!cursor-pointer"
                    loading={loading}
                    onClick={() => {
                      dispatch(deleteComment(comment.id));
                    }}
                  >
                    Delete comment
                  </Button>
                </Box>
              </Flex>
            </Card>
          ))}
      </Flex>
    </Container>
  );
};

export default CommentsSection;
