import { Button, Container, Flex } from "@radix-ui/themes";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../app/hooks";
import { getProductComments } from "../app/slices/commentsSlice";
import { fetchProductById } from "../app/slices/productsSlice";
import ProductDetailes from "../components/ProductDetailes";
import CommentsSection from "../components/CommentsSection";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const ProductDetailesPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(+id));
      dispatch(getProductComments(+id!));
    }
  }, [dispatch, id]);

  return (
    <Container p="5">
      <Button
        variant="ghost"
        color="indigo"
        className="!cursor-pointer"
        onClick={() => navigate("/products/")}
      >
        <ArrowLeftIcon /> Back to products
      </Button>
      <Flex direction="column" gap="6">
        <ProductDetailes />
        <CommentsSection />
      </Flex>
    </Container>
  );
};

export default ProductDetailesPage;
