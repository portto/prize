import { Link } from "react-router-dom";
import { Flex, Box, Text, Img } from "@chakra-ui/react";
import WalletConnect from "./WalletConnect";
import bloctoLogo from "../assets/blocto.png";

const HEADER_HEIGHT = 76;

const Header = () => (
  <>
    <Flex
      justify="space-between"
      align="center"
      height={HEADER_HEIGHT}
      px={{ base: 3, lg: 7 }}
      boxShadow="0px 0px 2px rgba(0, 0, 0, 0.1)"
      pos="fixed"
      top={0}
      left={0}
      right={0}
      bg="white"
      zIndex={10}
    >
      <Link to="/">
        <Flex align="center">
          <Img src={bloctoLogo} width={{ base: 30, lg: "100%" }} />
          <Text fontSize="2xl" fontWeight="bold" mx={2}>
            BLOCTO
          </Text>
          <Box width="1px" height={30} bg="#BCBCBC" mx={3} />
          <Text>Campaign</Text>
        </Flex>
      </Link>

      <WalletConnect />
    </Flex>
  </>
);
Header.HEIGHT = 76;

export default Header;
