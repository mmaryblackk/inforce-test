import { Container, Flex, Heading } from "@radix-ui/themes";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { fetchProducts } from "../app/slices/productsSlice";
import ProductList from "../components/ProductList";
import AddNewItem from "../components/AddNewItem";

const ProductListPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container p="5">
      <Heading mb="5" size="9" color="indigo">
        Products
      </Heading>
      <Flex justify="end" mb="5">
        <AddNewItem />
      </Flex>
      <ProductList />
    </Container>
  );
};

export default ProductListPage;
