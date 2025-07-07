import { Box, Flex, Heading } from "@radix-ui/themes";
import { useAppSelector } from "../app/hooks";
import { Specifications } from "./Specifications";
import DeletingAlert from "./DeletingAlert";
import EditProductDialog from "./EditProductDialog";

const ProductDetailes = () => {
  const { selectedProduct: product } = useAppSelector(
    (state) => state.products
  );
  return (
    <Flex direction="column">
      <Heading size="8" my="5">
        {product?.name}
      </Heading>
      <Flex gap="5" justify="between">
        <Box className="w-80">
          <img src={product?.imageUrl} />
        </Box>
        <Flex direction="column" gap="1" flexGrow="1">
          <Heading mb="5">Description</Heading>
          <Specifications label="Width" value={`${product?.size.width}mm`} />
          <Specifications label="Height" value={`${product?.size.height}mm`} />
          <Specifications label="Weight" value={product?.weight} />
          <Flex mt="5" justify="between">
            <EditProductDialog />

            <DeletingAlert product={product!} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductDetailes;
