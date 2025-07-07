import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addProduct } from "../app/slices/productsSlice";
import { useState } from "react";

const AddNewItem = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.products);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [count, setCount] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const handleAddProduct = () => {
    if (!name || !imageUrl || !count || !width || !height || !weight) {
      setError("Please, provide each value");
      return;
    }
    const payload = {
      name,
      imageUrl,
      count: +count,
      size: {
        width: +width,
        height: +height,
      },
      weight: `${weight}g`,
    };

    dispatch(addProduct(payload))
      .unwrap()
      .then(() => {
        resetForm();
      })
      .catch(() => {
        setError("Unable to add the product. Please, try one more time");
      });
  };

  const resetForm = () => {
    setName("");
    setImageUrl("");
    setCount("");
    setWidth("");
    setHeight("");
    setWeight("");
  };
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button className="cursor-pointer">Add product</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add new product</Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Image URL
              </Text>
              <TextField.Root
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Count
              </Text>
              <TextField.Root
                className="w-28"
                placeholder="Count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Size
              </Text>
              <Flex gap="3">
                <TextField.Root
                  className="w-28"
                  placeholder="Width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
                <TextField.Root
                  className="w-28"
                  placeholder="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </Flex>
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Weight
              </Text>
              <TextField.Root
                className="w-28"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
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
                onClick={resetForm}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                className="cursor-pointer"
                onClick={handleAddProduct}
                loading={loading}
              >
                Add product
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default AddNewItem;
