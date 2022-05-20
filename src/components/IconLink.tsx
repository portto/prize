import { Link } from "@chakra-ui/react";

const IconLink = (props: any) => (
  <Link
    d="block"
    bg="#EFEFEF"
    width="36px"
    height="36px"
    fontSize="20px"
    borderRadius="50%"
    lineHeight="36px"
    textAlign="center"
    _hover={{
      textDecoration: "none",
    }}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
);

export default IconLink;
