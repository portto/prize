import { Link } from "react-router-dom";
import { Flex, Box, Text, Img } from "@chakra-ui/react";
import WalletConnect from "./WalletConnect";
import bloctoLogo from "../assets/blocto.svg";

const HEADER_HEIGHT = 76;

const Header = () => (
  <Flex
    justify="space-between"
    align="center"
    height={HEADER_HEIGHT}
    px={{ base: 3, lg: 7 }}
    pos="fixed"
    bg="transparent"
    top={0}
    left={0}
    right={0}
    zIndex={10}
    _before={{
      pos: "absolute",
      width: "100%",
      height: "100%",
      content: '""',
      left: 0,
      bg: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(20px)",
      zIndex: -1,
    }}
  >
    <Link to="/">
      <Flex align="center">
        <Img src={bloctoLogo} width={{ base: "30px", lg: "40px" }} />
        <Text fontSize="2xl" fontWeight="bold" mx={2}>
          BLOCTO
        </Text>
        <Box width="1px" height={30} bg="#BCBCBC" mx={3} />
        <Text>Campaign</Text>
      </Flex>
    </Link>

    <WalletConnect />
  </Flex>
);
Header.HEIGHT = 76;

export default Header;
