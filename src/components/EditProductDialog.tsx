import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateProduct } from "../app/slices/productsSlice";
import { useState } from "react";
import type { Product } from "../types/Product";

const EditProductDialog = () => {
  const dispatch = useAppDispatch();
  const { selectedProduct: product, loading } = useAppSelector(
    (state) => state.products
  );

  const [name, setName] = useState(product?.name);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl);
  const [count, setCount] = useState(product?.count.toString());
  const [width, setWidth] = useState(product?.size.width.toString());
  const [height, setHeight] = useState(product?.size.height.toString());
  const [weight, setWeight] = useState(product?.weight.replace("g", ""));
  const [error, setError] = useState("");

  const handleEditProduct = () => {
    if (!product) return;

    if (!name || !imageUrl || !count || !width || !height || !weight) {
      setError("Please, provide each value");
      return;
    }

    const updatedProduct: Product = {
      ...product,
      name,
      imageUrl,
      count: +count,
      size: {
        width: +width,
        height: +height,
      },
      weight: `${weight}g`,
    };

    dispatch(updateProduct(updatedProduct))
      .unwrap()
      .catch(() => setError("Unable to update the product. Please try again."));
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="!cursor-pointer w-14" variant="soft" color="violet">
          Edit
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit product</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text>Name</Text>
            <TextField.Root
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </label>

          <label>
            <Text>Image URL</Text>
            <TextField.Root
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
            />
          </label>

          <label>
            <Text>Count</Text>
            <TextField.Root
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="Count"
              type="number"
              className="w-28"
            />
          </label>

          <label>
            <Text>Size</Text>
            <Flex gap="3">
              <TextField.Root
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Width"
                type="number"
                className="w-28"
              />
              <TextField.Root
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Height"
                type="number"
                className="w-28"
              />
            </Flex>
          </label>

          <label>
            <Text>Weight</Text>
            <TextField.Root
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight (e.g. 500)"
              className="w-28"
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
            <Button variant="soft" color="gray" className="cursor-pointer">
              Cancel
            </Button>
          </Dialog.Close>

          <Dialog.Close>
            <Button
              onClick={handleEditProduct}
              loading={loading}
              className="cursor-pointer"
              color="violet"
            >
              Save changes
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditProductDialog;
