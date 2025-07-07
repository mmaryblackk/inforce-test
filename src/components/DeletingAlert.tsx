import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useAppDispatch } from "../app/hooks";
import { deleteProduct } from "../app/slices/productsSlice";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router";

type Props = {
  product: Product;
};

const DeletingAlert: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button
          variant="soft"
          color="tomato"
          size="2"
          className="cursor-pointer"
        >
          Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete the product</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This action cannot be undo.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" className="cursor-pointer">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="tomato"
              className="cursor-pointer"
              onClick={() => {
                dispatch(deleteProduct(product.id));
                navigate("/products");
              }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeletingAlert;
