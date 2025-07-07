import { Box, Button, Card, Flex, Heading } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { useAppSelector } from "../app/hooks";
import { Specifications } from "./Specifications";
import DeletingAlert from "./DeletingAlert";

const ProductList = () => {
  const { products } = useAppSelector((state) => state.products);
  const navigate = useNavigate();
  return (
    <Flex gap="6" wrap="wrap" justify="center">
      {products.map((product) => (
        <Card key={product.id} size="2">
          <Flex direction="column" justify="center" gap="4">
            <Box className="h-52">
              <img
                src={product.imageUrl}
                className="object-contain w-52 max-h-52"
              />
            </Box>
            <Heading size="5">{product.name}</Heading>
            <Flex direction="column" gap="1">
              <Specifications label="Count" value={product.count} />
              <Specifications label="Width" value={`${product.size.width}mm`} />
              <Specifications
                label="Height"
                value={`${product.size.height}mm`}
              />
              <Specifications label="Weight" value={product.weight} />
            </Flex>
            <Flex justify="between">
              <Button
                className="!cursor-pointer"
                variant="outline"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View detailes
              </Button>

              <DeletingAlert product={product!} />
            </Flex>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default ProductList;
