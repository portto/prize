import { ChakraProps, Flex, Img } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import body from "../assets/visual-body.png";
import ring from "../assets/visual-ring.png";
import ringShadow from "../assets/visual-ring-shadow.png";

const bodyAnimation = keyframes`
  0% { bottom: 35% }
  50% { bottom: 37% }
  100% { bottom: 35% }
`;

const shadowAnimation = keyframes`
  0% { bottom: 22% }
  50% { bottom: 20% }
  100% { bottom: 22% }
`;

const Visual = (props: ChakraProps) => (
  <Flex
    pos="relative"
    justify="center"
    align="center"
    top={{ base: 30, lg: 0 }}
    height={{ base: 350, md: 600, lg: 800 }}
    width={{ base: 350, md: 600, lg: 800 }}
    mx="auto"
    zIndex={-1}
    {...props}
  >
    <Img src={ring} pos="absolute" bottom="20%" />
    <Img
      src={ringShadow}
      pos="absolute"
      animation={`${shadowAnimation} infinite 2s ease-in-out`}
    />
    <Img
      src={body}
      pos="absolute"
      width="45.6%"
      marginRight="1.5%"
      animation={`${bodyAnimation} infinite 2s ease-in-out`}
    />
  </Flex>
);

export default Visual;
