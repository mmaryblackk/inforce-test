import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addComment } from "../app/slices/commentsSlice";

const AddComment = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { loading } = useAppSelector((state) => state.comments);
  const { selectedProduct } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const handleAddComment = () => {
    if (!description) {
      setError("Please, provide each value");
      return;
    }
    const payload = {
      productId: selectedProduct!.id,
      description,
    };

    dispatch(addComment(payload))
      .unwrap()
      .then(() => {
        reset();
      })
      .catch(() => {
        setError("Unable to add the comment. Please, try one more time");
      });
  };

  const reset = () => {
    setDescription("");
  };
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button className="cursor-pointer" color="violet">
            Add comment
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add comment</Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Text
              </Text>
              <TextField.Root
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter some text..."
              />
            </label>

            {error && (
              <Text color="red" mt="2">
                {error}
              </Text>
            )}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                className="cursor-pointer"
                onClick={reset}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                className="cursor-pointer"
                color="violet"
                onClick={handleAddComment}
                loading={loading}
              >
                Add comment
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default AddComment;
