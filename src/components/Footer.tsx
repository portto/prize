import { Box, Flex, Text, Link } from "@chakra-ui/react";
import IconLink from "./IconLink";
import Instagram from "./icons/Instagram";

const FooterLink = (props: any) => (
  <Link
    d="block"
    target="_blank"
    rel="noopener noreferrer"
    mb={2}
    _hover={{
      textDecoration: "none",
      opacity: 0.8,
      transform: "scale(0.98)",
    }}
    _visited={{ opacity: 0.8, transform: "scale(0.96)" }}
    transition="all .2s"
    {...props}
  />
);

const Footer = () => (
  <Box bg="#F9F9F9" py={5} px={7}>
    <Flex
      justify="space-between"
      direction={{ base: "column", lg: "row" }}
      mx={{ base: "30px", lg: "100px" }}
      my={{ base: "30px", lg: "60px" }}
    >
      <Flex justify="space-between" width={{ base: "100%", lg: "300px" }}>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            COMPANY
          </Text>
          <FooterLink href="https://portto.com/">Blocto</FooterLink>
          <FooterLink href="https://token.blocto.app/">Blocto Token</FooterLink>
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            SUPPORT
          </Text>
          <FooterLink href="https://portto.com/terms/">Term of use</FooterLink>
          <FooterLink href="https://portto.com/privacy/">
            Privacy Policy
          </FooterLink>
        </Box>
      </Flex>
      <Flex
        justify={{ base: "center", lg: "flex-end" }}
        mt={{ base: 12, lg: 0 }}
      >
        <IconLink href="http://discord.gg/QRZTr6yHmY" mx="10px">
          <Box className="fab fa-discord" color="#7f7f7f" />
        </IconLink>
        <IconLink href="https://twitter.com/BloctoApp" mx="10px">
          <Box className="fab fa-twitter" color="#7f7f7f" />
        </IconLink>
        <IconLink href="https://www.facebook.com/blocto" mx="10px">
          <Box className="fab fa-facebook-f" color="#7f7f7f" />
        </IconLink>
        <IconLink href="https://www.instagram.com/bloctoapp/" mx="10px">
          <Instagram fill="#7f7f7f" boxSize="24px" d="inline" mb="2px" />
        </IconLink>
      </Flex>
    </Flex>

    <Box as="hr" my={6} />

    <Text
      fontSize={14}
      align={{ base: "center", lg: "left" }}
      color="#7F7F7F"
      opacity=".65"
    >
      © 2022 Blocto’s Campaign. All rights reserved.
    </Text>
  </Box>
);

export default Footer;
