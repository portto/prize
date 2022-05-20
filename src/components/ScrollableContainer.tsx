import { Box, ChakraProps } from "@chakra-ui/react";

interface ScrollableContainerProps extends ChakraProps {
  children: any;
}

const ScrollableContainer = ({
  children,
  ...rest
}: ScrollableContainerProps) => (
  <Box
    __css={{
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }}
    {...rest}
    overflow="auto"
    whiteSpace="nowrap"
  >
    {children}
  </Box>
);

export default ScrollableContainer;
