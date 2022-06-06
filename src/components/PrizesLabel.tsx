import { Flex, Text } from "@chakra-ui/react";
import Prize from "./icons/Prize";

interface PrizesLabelProps {
  prizes: Array<{
    name: string;
  }>;
  active: boolean;
}

const PrizesLabel = ({ prizes, active }: PrizesLabelProps) => (
  <Flex my="5px">
    <Flex
      bg="#F9F9F9"
      width="22px"
      height="22px"
      minW="22px"
      borderRadius="50%"
      justify="center"
      align="center"
    >
      <Prize fill={active ? "#0A94FF" : "#7f7f7f"} size={12} />
    </Flex>
    <Text
      color={active ? "#141414" : "#7f7f7f"}
      ml={2}
      overflow="hidden"
      textOverflow="ellipsis"
      textAlign="left"
    >
      {prizes.map(({ name }) => name).join(", ") || "Stay tuned!"}
    </Text>
  </Flex>
);

export default PrizesLabel;
