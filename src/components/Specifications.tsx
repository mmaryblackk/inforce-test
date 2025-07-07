import { Flex, Text } from "@radix-ui/themes";
import React from "react";

type Props = {
  label: string;
  value: string | number | undefined;
};
export const Specifications: React.FC<Props> = ({ label, value }) => (
  <Flex justify="between">
    <Text size="2" weight="medium">
      {label}
    </Text>
    <Text size="2" weight="regular">
      {value}
    </Text>
  </Flex>
);
