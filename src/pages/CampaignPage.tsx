import {
  Box,
  Button,
  Flex,
  Img,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Navigate, useParams } from "react-router";
import { useContext, useEffect } from "react";
import CampaignCard from "../components/CampaignCard";
import ScrollableContainer from "../components/ScrollableContainer";
import bloctoLogo from "../assets/blocto.png";
import campaigns from "../fakeData";
import Countdown from "../components/Countdown";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Prize from "../components/icons/Prize";
import Trending from "../components/icons/Trending";
import ScrollToTopButton from "../components/ScrollToTopButton";
import AuthContext from "../context/auth";

dayjs.extend(utc);
dayjs.extend(timezone);

const CampaignPage = () => {
  const { id = -1 } = useParams();
  const { user } = useContext(AuthContext);
  const campaign = campaigns.find((c) => c.id === ~~id);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!campaign) {
    return <Navigate to="/" />;
  }

  const isTrending = Date.now() <= campaign.endAt * 1000;
  const startTime = dayjs(campaign.startAt * 1000);
  const endTime = dayjs(campaign.endAt * 1000);

  const claimablePrizes = user?.addr ? campaign.prizes : [];
  const claimablePrizeToken = claimablePrizes[0]?.tokenName;
  const totalClaimableAmount = claimablePrizes?.reduce(
    (acc, cur) => acc + cur.amount,
    0
  );

  const claimText = claimablePrizes.length
    ? `You can claim a total of ${totalClaimableAmount} ${claimablePrizeToken}`
    : "You are NOT eligible";

  return (
    <Box px={{ base: 0, lg: 102 }} py={{ base: 23, lg: 66 }}>
      <Flex
        gap={10}
        px={{ base: 4, lg: 60 }}
        direction={{ base: "column", lg: "row" }}
      >
        <Box flex={1} pr={{ base: 0, lg: 3 }}>
          <Img
            src={campaign.bannerUrl}
            borderRadius="12px"
            width="100%"
            mb={7}
          />
          {isTrending && (
            <>
              <Flex direction="column">
                {claimablePrizes.length ? (
                  <>
                    <Box bg="primary.100" borderRadius="12px" p={25} mb={7}>
                      <Text fontWeight="bold">
                        Congratulation on winning the awards at this event:
                      </Text>
                      <UnorderedList>
                        {claimablePrizes.map((prize, index) => (
                          <ListItem key={index} my={2}>
                            {prize.name}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </Box>
                    <Button
                      bg="primary.700"
                      borderRadius={100}
                      color="white"
                      _hover={{ opacity: 0.8 }}
                      _active={{ opacity: 0.9 }}
                      mx="20%"
                      mb={5}
                    >
                      Claim
                    </Button>
                  </>
                ) : (
                  <Box
                    as="button"
                    bg="#7f7f7f"
                    py={2}
                    borderRadius={100}
                    color="white"
                    mx="20%"
                    mb={5}
                    disabled
                    fontWeight="bold"
                    cursor="not-allowed"
                  >
                    Claim
                  </Box>
                )}
              </Flex>
              <Text align="center" color="#7f7f7f">
                {claimText}
              </Text>
            </>
          )}
        </Box>
        <Box flex={1}>
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
            <Text fontSize="xl" ml={4} color="#7f7f7f">
              Blocto
            </Text>
          </Flex>
          <Text
            fontSize={{ base: "3xl", lg: "4xl" }}
            fontWeight="bold"
            lineHeight={1}
            my={7}
          >
            {campaign.title}
          </Text>
          <Box bg="#F9F9F9" borderRadius="12px" p={{ base: 4, lg: 25 }} mb={5}>
            <Flex justify="space-between" align="center" mb={4}>
              <Text fontWeight="bold">Campaign ends in</Text>
              {isTrending && (
                <Flex
                  bg="white"
                  align="center"
                  px={5}
                  py={1}
                  borderRadius={100}
                >
                  <Trending fill="#0a94ff" />
                  <Text color="primary.700" ml={1} fontWeight="semibold">
                    Trending
                  </Text>
                </Flex>
              )}
            </Flex>
            <Countdown
              endTime={endTime}
              active={isTrending}
              size="lg"
              bg="white"
            />
            <Text fontWeight="bold" my={4}>
              Claimable Period
            </Text>
            <Box bg="white" borderRadius="12px" py={4} px={6}>
              {startTime?.utc().format("YYYY/MM/DD HH:mm")}
              {" - "}
              {endTime?.utc().format("YYYY/MM/DD HH:mm")} (UTC+0)
            </Box>
          </Box>

          <Box bg="#F9F9F9" borderRadius="12px" p={{ base: 4, lg: 25 }} mb={5}>
            <Text fontWeight="bold">Description</Text>
            <Box as="hr" my={4} />
            {campaign.description}
          </Box>

          <Box bg="#F9F9F9" borderRadius="12px" p={{ base: 4, lg: 25 }} mb={5}>
            <Text fontWeight="bold">Prizes</Text>
            <Box as="hr" my={4} />
            <Box>
              {campaign.prizes.map((prize, index) => (
                <Flex key={index} my={2} align="center">
                  <Flex
                    width={25}
                    height={25}
                    bg="white"
                    borderRadius="50%"
                    justify="center"
                    align="center"
                  >
                    <Prize fill="#0a94ff" />
                  </Flex>
                  <Text ml={2.5}>{prize.name}</Text>
                </Flex>
              ))}
            </Box>
          </Box>
        </Box>
      </Flex>
      <Box>
        <Text fontSize="4xl" fontWeight="bold" align="center" my={10}>
          More Trending
        </Text>
        <ScrollableContainer pb={3}>
          {campaigns
            .filter((campaign) => Date.now() <= campaign.endAt * 1000)
            .map((campaign) => (
              <Box
                key={campaign.id}
                p={{ base: 4, lg: 0 }}
                d="inline-block"
                mr={{ base: 4, lg: 5 }}
                width={["100%", "50%", "33%", "25%", "20%"]}
              >
                <CampaignCard {...campaign} />
              </Box>
            ))}
        </ScrollableContainer>
        <ScrollToTopButton />
      </Box>
    </Box>
  );
};

export default CampaignPage;
