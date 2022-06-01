import { ChevronUpIcon } from "@chakra-ui/icons";
import { Box, ChakraProps, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ScrollToTopButton = (props: ChakraProps) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > window.innerHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <Box position="fixed" right={0} bottom={10} m={4} {...props}>
      <IconButton
        icon={<ChevronUpIcon />}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        color="#7F7F7F"
        fontSize={20}
        aria-label="go to top button"
        borderRadius="50%"
        bg="white"
        opacity={visible ? 1 : 0}
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
    </Box>
  );
};

export default ScrollToTopButton;
