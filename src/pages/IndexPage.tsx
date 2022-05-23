import { Flex, Box, Text, Img } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import Header from "../components/Header";
import IconLink from "../components/IconLink";
import CampaignCard from "../components/CampaignCard";
import ScrollableContainer from "../components/ScrollableContainer";
import PrizesLabel from "../components/PrizesLabel";
import Countdown from "../components/Countdown";
import ScrollToTopButton from "../components/ScrollToTopButton";
import bloctoLogo from "../assets/blocto.png";
import Visual from "../components/Visual";
import { Campaign } from "../types";
import getCampaignsScript from "../scripts/getCampaigns";

const IndexPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const trendingCampaigns = campaigns.filter(
    (campaign) =>
      campaign.startAt * 1000 <= Date.now() &&
      Date.now() <= campaign.endAt * 1000
  );

  useEffect(() => {
    fcl
      .send([fcl.script(getCampaignsScript)])
      .then(fcl.decode)
      .then((data: any) => setCampaigns(data));
  }, []);

  return (
    <Box>
      <Flex
        direction={{ base: "column", lg: "row" }}
        height={{ base: "auto", lg: `calc(100vh - ${Header.HEIGHT}px)` }}
        align={{ base: "stretch", lg: "center" }}
        px={{ base: "20px", lg: "104px" }}
        py={{ base: "40px", lg: "60px" }}
      >
        <Box flex={2} textAlign={{ base: "center", lg: "start" }}>
          <Text
            fontSize={{ base: "5xl", lg: "6xl" }}
            fontWeight="bold"
            lineHeight={1}
            mb={8}
          >
            Blocto’s Campaign
          </Text>
          <Text my={3}>
            Unleashing the full potential of blockchain technology has never
            been easier. Manage your crypto, dApps, and NFT all-in-once through
            Blocto, the cross-chain crypto wallet.
          </Text>
          <Flex
            justify={{ base: "center", lg: "flex-start" }}
            mt={8}
            ml="-10px"
          >
            <IconLink href="http://discord.gg/blocto" mx="10px">
              <Box className="fab fa-discord" color="#7f7f7f" />
            </IconLink>
            <IconLink href="https://twitter.com/BloctoApp" mx="10px">
              <Box className="fab fa-twitter" color="#7f7f7f" />
            </IconLink>
            <IconLink href="https://www.facebook.com/blocto" mx="10px">
              <Box className="fab fa-facebook-f" color="#7f7f7f" />
            </IconLink>
            <IconLink href="https://www.instagram.com/bloctoapp/" mx="10px">
              <Box className="fab fa-instagram-square" color="#7f7f7f" />
            </IconLink>
          </Flex>
        </Box>
        <Visual />
      </Flex>
      <Box px={{ base: "20px", lg: "104px" }} py={{ base: "40px", lg: "60px" }}>
        <Box mb={140}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            my={5}
            align={{ base: "center", lg: "left" }}
          >
            Trending
          </Text>
          {trendingCampaigns[0] && (
            <Link to={`/campaigns/${trendingCampaigns[0].id}`}>
              <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                boxShadow="0px 0px 20px rgba(0, 0, 0, 0.05)"
                borderRadius="12px"
                px={{ base: "12px", lg: "57px" }}
                py={{ base: "15px", lg: "37px" }}
                mb="50px"
              >
                <Box
                  flex="1"
                  mt={{ base: 0, lg: 20 }}
                  pr={{ base: "0", lg: 20 }}
                >
                  <Flex align="center">
                    <Box
                      boxShadow="0px 0px 20px rgba(0, 0, 0, 0.05)"
                      borderRadius="50%"
                      width={45}
                      height={45}
                      p={1}
                    >
                      <Img
                        src={trendingCampaigns[0].holderLogo || bloctoLogo}
                      />
                    </Box>
                    <Text fontSize="xl" ml={4} color="#7f7f7f">
                      {trendingCampaigns[0].holder || "Blocto"}
                    </Text>
                  </Flex>
                  <Text
                    fontSize={{ base: "3xl", lg: "4xl" }}
                    fontWeight="bold"
                    lineHeight={1}
                    my={8}
                  >
                    {trendingCampaigns[0].title}
                  </Text>
                  <Text my={3}>{trendingCampaigns[0].description}</Text>
                  <Box py={{ base: 1, lg: 3 }}>
                    <PrizesLabel
                      prizes={trendingCampaigns[0].prizes}
                      active={true}
                    />
                  </Box>
                  <Countdown
                    endTime={dayjs(trendingCampaigns[0].endAt * 1000)}
                    active={true}
                    size="lg"
                    my={5}
                  />
                </Box>
                <Box flex="1">
                  <Img
                    src={trendingCampaigns[0].bannerUrl}
                    borderRadius="12px"
                    width="100%"
                  />
                </Box>
              </Flex>
            </Link>
          )}

          <ScrollableContainer pb={3}>
            {campaigns
              .filter((campaign) => Date.now() <= campaign.endAt * 1000)
              .map((campaign) => (
                <Box
                  key={campaign.id}
                  p={{ base: 3, lg: 0 }}
                  d="inline-block"
                  mr={{ base: 4, lg: 5 }}
                  width={["100%", "50%", "33%", "25%", "20%"]}
                >
                  <CampaignCard {...campaign} />
                </Box>
              ))}
          </ScrollableContainer>
        </Box>
        <Box mb={140}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            my={5}
            align={{ base: "center", lg: "left" }}
          >
            Upcoming
          </Text>
          <ScrollableContainer pb={3}>
            {campaigns
              .filter((campaign) => Date.now() < campaign.startAt * 1000)
              .map((campaign) => (
                <Box
                  key={campaign.id}
                  p={{ base: 3, lg: 0 }}
                  d="inline-block"
                  mr={{ base: 4, lg: 5 }}
                  width={["100%", "50%", "33%", "33%", "25%"]}
                >
                  <CampaignCard {...campaign} variant="upcoming" />
                </Box>
              ))}
          </ScrollableContainer>
        </Box>
        <Box>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            my={5}
            align={{ base: "center", lg: "left" }}
          >
            Ended
          </Text>
          <ScrollableContainer pb={3}>
            {campaigns
              .filter((campaign) => Date.now() > campaign.endAt * 1000)
              .map((campaign) => (
                <Box
                  key={campaign.id}
                  p={{ base: 3, lg: 0 }}
                  d="inline-block"
                  mr={{ base: 4, lg: 5 }}
                  width={["100%", "50%", "33%", "25%", "20%"]}
                >
                  <CampaignCard {...campaign} variant="ended" />
                </Box>
              ))}
          </ScrollableContainer>
        </Box>
        <ScrollToTopButton />
      </Box>
    </Box>
  );
};

export default IndexPage;
