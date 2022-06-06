import { Link } from "@chakra-ui/react";

const IconLink = (props: any) => (
  <Link
    d="block"
    bg="#EFEFEF"
    width="36px"
    height="36px"
    borderRadius="50%"
    lineHeight="36px"
    textAlign="center"
    _hover={{
      textDecoration: "none",
      opacity: 0.8,
      transform: "scale(0.98)",
    }}
    _visited={{ opacity: 0.8, transform: "scale(0.96)" }}
    transition="all .2s"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
);

export default IconLink;
