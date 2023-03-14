import { Flex, Box, Text, Img } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import Header from "../components/Header";
import IconLink from "../components/IconLink";
import CampaignCard from "../components/CampaignCard";
import ScrollableContainer from "../components/ScrollableContainer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import TrendingSlide from "../components/TrendingSlide";
import Visual from "../components/Visual";
import { Campaign } from "../types";
import getCampaignsScript from "../scripts/getCampaigns";
import stayTuned from "../assets/stay-tuned.jpg";
import Instagram from "../components/icons/Instagram";

const IndexPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const trendingCampaigns = campaigns
    .filter(
      (campaign) =>
        campaign.startAt * 1000 <= Date.now() &&
        Date.now() <= campaign.endAt * 1000
    )
    .filter((campaign) => !campaign.cancelled)

    .slice(0, 3);
  const upcomingCampaigns = campaigns
    .filter((campaign) => Date.now() < campaign.startAt * 1000)
    .filter((campaign) => !campaign.cancelled)
    .sort((a, b) => a.startAt - b.startAt);

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
            fontSize={{ base: "4xl", lg: "44px" }}
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
        </Box>
        <Visual />
      </Flex>
      <Box px={{ base: "20px", lg: "104px" }} py={{ base: "40px", lg: "60px" }}>
        <Box mb={140}>
          <Text
            fontSize="4xl"
            fontWeight="bold"
            my={5}
            align={{ base: "center", lg: "left" }}
          >
            Trending
          </Text>
          {!!trendingCampaigns.length && (
            <TrendingSlide campaigns={trendingCampaigns} />
          )}

          <ScrollableContainer pb={3}>
            {campaigns
              .filter((campaign) => Date.now() <= campaign.endAt * 1000)
              .filter((campaign) => !campaign.cancelled)
              .map((campaign) => (
                <Box
                  key={campaign.id}
                  p={{ base: 3, lg: 0 }}
                  d="inline-block"
                  mr={{ base: 4, lg: 5 }}
                  width={[
                    "100%",
                    "calc(50% - 12px)",
                    "calc(33% - 12px)",
                    "calc(25% - 15px)",
                  ]}
                >
                  <CampaignCard {...campaign} />
                </Box>
              ))}
          </ScrollableContainer>
        </Box>
        <Box mb={140}>
          <Text
            fontSize="4xl"
            fontWeight="bold"
            my={5}
            align={{ base: "center", lg: "left" }}
          >
            Upcoming
          </Text>
          <ScrollableContainer pb={3}>
            {upcomingCampaigns.map((campaign) => (
              <Box
                key={campaign.id}
                p={{ base: 3, lg: 0 }}
                d="inline-block"
                mr={{ base: 4, lg: 5 }}
                width={["100%", "calc(50% - 12px)", "calc(33% - 9px)"]}
              >
                <CampaignCard {...campaign} variant="upcoming" />
              </Box>
            ))}
            {Array.from({ length: 3 - upcomingCampaigns.length }).map(
              (_, index) => (
                <Box
                  key={index}
                  p={{ base: 3, lg: 0 }}
                  d="inline-block"
                  mr={{ base: 4, lg: 5 }}
                  width={["100%", "calc(50% - 12px)", "calc(33% - 12px)"]}
                >
                  <Img src={stayTuned} borderRadius="12px" />
                </Box>
              )
            )}
          </ScrollableContainer>
        </Box>

        <Box>
          <Text
            fontSize="4xl"
            fontWeight="bold"
            my={5}
            align={{ base: "center", lg: "left" }}
          >
            Ended
          </Text>
          <ScrollableContainer pb={3}>
            {campaigns
              .filter((campaign) => Date.now() > campaign.endAt * 1000)
              .filter((campaign) => !campaign.cancelled)
              .map((campaign) => (
                <Box
                  key={campaign.id}
                  p={{ base: 3, lg: 0 }}
                  d="inline-block"
                  ml={{ base: 3, lg: 5 }}
                  _first={{
                    ml: 0,
                  }}
                  width={[
                    "100%",
                    "calc(50% - 12px)",
                    "calc(33% - 12px)",
                    "calc(25% - 15px)",
                  ]}
                >
                  <CampaignCard {...campaign} variant="ended" />
                </Box>
              ))}
          </ScrollableContainer>
        </Box>
      </Box>
      <ScrollToTopButton my={10} mx={20} />
    </Box>
  );
};

export default IndexPage;
