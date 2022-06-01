import { ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";

const ScrollToTopButton = () => (
  <Flex justify="end" m={4}>
    <IconButton
      icon={<ChevronUpIcon />}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      color="#7F7F7F"
      fontSize={20}
      aria-label="go to top button"
      borderRadius="50%"
      bg="white"
      _hover={{
        opacity: 0.8,
        transform: "scale(0.98)",
      }}
      _focus={{
        transform: "scale(0.96)",
        focus: "none",
        outline: "none",
      }}
      transition="all .2s"
      boxShadow="0px 0px 20px rgba(0, 0, 0, 0.05)"
    />
  </Flex>
);

export default ScrollToTopButton;
