import {
  AspectRatio,
  Box,
  ChakraProps,
  Flex,
  Img,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Campaign } from "../types";
import Countdown from "./Countdown";
import PrizesLabel from "./PrizesLabel";
import bloctoLogo from "../assets/blocto.svg";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import preset from "../assets/preset.jpg";

const Arrow = ({
  children,
  onClick,
  ...rest
}: { children: any; onClick: () => void } & ChakraProps) => (
  <Flex
    role="button"
    pos="absolute"
    justify="center"
    align="center"
    top="50%"
    width="40px"
    height="40px"
    bg="white"
    opacity={0}
    _groupHover={{ opacity: 1 }}
    borderRadius="50%"
    boxShadow="0px 0px 20px rgba(0, 0, 0, 0.05)"
    transition="opacity .2s"
    onClick={onClick}
    zIndex={1}
    _hover={{
      opacity: 0.8,
      transform: "scale(0.98)",
    }}
    {...rest}
  >
    {children}
  </Flex>
);

const TrendingSlide = ({ campaigns }: { campaigns: Campaign[] }) => {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  const [current, setCurrent] = useState(0);

  return (
    <Box mb="50px" mx={-5} role="group">
      <Carousel
        autoPlay
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        selectedItem={current}
        onChange={setCurrent}
        renderArrowPrev={(onClick) =>
          isDesktop && (
            <Arrow left={1} onClick={onClick}>
              <ChevronLeftIcon color="#7F7F7F" boxSize={7} />
            </Arrow>
          )
        }
        renderArrowNext={(onClick) =>
          isDesktop && (
            <Arrow right={0} onClick={onClick}>
              <ChevronRightIcon color="#7F7F7F" boxSize={7} />
            </Arrow>
          )
        }
      >
        {campaigns.map((campaign) => (
          <Link key={campaign.id} to={`/campaigns/${campaign.id}`}>
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              boxShadow="0px 0px 20px rgba(0, 0, 0, 0.05)"
              borderRadius="12px"
              m={5}
              px={{ base: "20px", lg: "57px" }}
              py={{ base: "20px", lg: "37px" }}
              _hover={{
                opacity: 0.8,
                transform: "scale(0.98)",
              }}
              transition="all .2s"
            >
              <Box
                flex="1"
                mt={{ base: 0, lg: 20 }}
                pr={{ base: "0", lg: 20 }}
                maxW={{ base: "100%", md: "50%" }}
              >
                <Flex align="center">
                  <Box
                    boxShadow="0px 0px 20px rgba(0, 0, 0, 0.05)"
                    borderRadius="50%"
                    width={30}
                    height={30}
                    p={1}
                  >
                    <Img src={bloctoLogo} />
                  </Box>
                  <Text fontSize={14} ml={2} color="#7f7f7f">
                    Blocto
                  </Text>
                  {campaign.partner && campaign.partnerLogo && (
                    <>
                      <Text fontSize={12} mx={2} color="#7f7f7f">
                        X
                      </Text>
                      <Box p={1}>
                        <AspectRatio
                          ratio={1}
                          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.05)"
                          borderRadius="50%"
                          width={25}
                          height={25}
                        >
                          <Img src={campaign.partnerLogo} borderRadius="50%" />
                        </AspectRatio>
                      </Box>
                      <Text fontSize={14} ml={2} color="#7f7f7f">
                        {campaign.partner}
                      </Text>
                    </>
                  )}
                </Flex>
                <Text
                  fontSize={{ base: "3xl", lg: "4xl" }}
                  fontWeight="bold"
                  lineHeight={1}
                  align="left"
                  my={8}
                >
                  {campaign.title}
                </Text>
                <Text
                  my={3}
                  align="left"
                  whiteSpace="pre-line"
                  display="-webkit-inline-box"
                  overflow="hidden"
                  sx={{
                    "-webkit-line-clamp": "3",
                    "-webkit-box-orient": "vertical",
                  }}
                  dangerouslySetInnerHTML={{ __html: campaign.description }}
                />
                <Box py={{ base: 1, lg: 3 }}>
                  <PrizesLabel prizes={campaign.prizes} active={true} />
                </Box>
                <Countdown
                  endTime={dayjs(campaign.endAt * 1000)}
                  active={true}
                  size="lg"
                  my={5}
                />
              </Box>
              <Box flex="1">
                <Img
                  src={campaign.bannerUrl || preset}
                  borderRadius="12px"
                  width="100%"
                />
              </Box>
            </Flex>
          </Link>
        ))}
      </Carousel>

      <Flex justify="center" mt={3} d={{ base: "flex", md: "none" }}>
        {campaigns.map((campaign, index) => (
          <Box
            key={campaign.id}
            role="button"
            mx={1}
            width="7px"
            height="7px"
            bg={current === index ? "primary.500" : "#EFEFEF"}
            borderRadius="50%"
            onClick={() => {
              setCurrent(index);
              console.log(index);
            }}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default TrendingSlide;
