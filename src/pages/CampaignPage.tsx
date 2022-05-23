import {
  Box,
  Button,
  Flex,
  Img,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import { Navigate, useParams } from "react-router";
import { useCallback, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import CampaignCard from "../components/CampaignCard";
import Countdown from "../components/Countdown";
import ScrollableContainer from "../components/ScrollableContainer";
import Prize from "../components/icons/Prize";
import Trending from "../components/icons/Trending";
import ScrollToTopButton from "../components/ScrollToTopButton";
import AuthContext from "../context/auth";
import { Campaign, Token } from "../types";
import bloctoLogo from "../assets/blocto.png";
import getCampaignsScript from "../scripts/getCampaigns";
import getCampaignScript from "../scripts/getCampaign";
import claimPrizesScriptBuilder from "../scripts/builder/claimPrizes";

dayjs.extend(utc);
dayjs.extend(timezone);

const FETCHING_STATUS = {
  IDLE: 0,
  FETCHING: 1,
  DONE: 2,
  ERROR: 3,
};

const CLAIMING_STATUS = {
  IDLE: 0,
  CLAIMING: 1,
  DONE: 2,
  ERROR: 3,
};

const CampaignPage = () => {
  const params = useParams();
  const id = +(params.id as any);
  const { user } = useContext(AuthContext);
  const [fetchingStatus, setFetchingStatus] = useState(FETCHING_STATUS.IDLE);
  const [claimingStatus, setClaimingStatus] = useState(CLAIMING_STATUS.IDLE);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaign, setCampaign] = useState<Campaign | undefined>();
  const toast = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  useEffect(() => {
    setFetchingStatus(FETCHING_STATUS.FETCHING);
    Promise.all([
      fcl.send([fcl.script(getCampaignsScript)]).then(fcl.decode),
      fcl
        .send([
          fcl.script(getCampaignScript),
          fcl.args([fcl.arg(+id, types.Int)]),
        ])
        .then(fcl.decode),
    ]).then(([items, item]) => {
      setCampaigns(items);
      setCampaign(item);
      setFetchingStatus(FETCHING_STATUS.DONE);
    });
  }, [id]);

  const claimPrizes = useCallback(
    (token: Token) => async () => {
      setClaimingStatus(CLAIMING_STATUS.CLAIMING);
      try {
        const block = await fcl.send([fcl.getBlock(true)]).then(fcl.decode);
        await fcl
          .send([
            fcl.transaction(claimPrizesScriptBuilder(token)),
            fcl.args([fcl.arg(id, types.Int)]),
            fcl.proposer(fcl.currentUser().authorization),
            fcl.authorizations([fcl.currentUser().authorization]),
            fcl.payer(fcl.currentUser().authorization),
            fcl.ref(block.id),
            fcl.limit(9999),
          ])
          .then(({ transactionId }: { transactionId: string }) =>
            fcl.tx(transactionId).onceSealed()
          )
          .then(() => {
            toast({
              title: "Claim successfully!",
              status: "success",
              isClosable: true,
              duration: 1000,
            });
            setClaimingStatus(CLAIMING_STATUS.DONE);
          });
      } catch (e: any) {
        console.log(e);
        toast({
          title: `Error: ${e.message}`,
          status: "error",
          isClosable: true,
          duration: 1000,
        });
        setClaimingStatus(CLAIMING_STATUS.ERROR);
      }
    },
    [id, toast]
  );

  if (!campaign) return null;
  if (fetchingStatus === FETCHING_STATUS.DONE && !campaign)
    return <Navigate to="/" />;

  const isTrending = !!campaign && Date.now() <= campaign.endAt * 1000;
  const startTime = campaign ? dayjs(campaign.startAt * 1000) : null;
  const endTime = campaign ? dayjs(campaign.endAt * 1000) : null;

  const address = user?.addr;

  const claimablePrizes =
    (address &&
      campaign?.winners[address]?.map(
        (prizeIndex) => campaign.prizes[prizeIndex]
      )) ||
    [];
  const claimablePrizeToken = claimablePrizes?.[0]?.token;
  const claimable =
    !!claimablePrizes.length &&
    startTime?.isBefore(dayjs()) &&
    endTime?.isAfter(dayjs());
  const claimed = campaign.claimed[address];
  const totalClaimableAmount = claimablePrizes?.reduce(
    (acc: number, cur: any) => acc + +cur.amount,
    0
  );

  const claimText = claimablePrizes?.length
    ? `You can claim a total of ${totalClaimableAmount} ${claimablePrizeToken.name}`
    : "You are NOT eligible";

  return (
    <Box px={{ base: 0, lg: 30, xl: "102px" }} py={{ base: 23, lg: 66 }}>
      <Flex
        gap={10}
        px={{ base: 4, lg: 20, xl: "60px" }}
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
                {claimable && (
                  <Box bg="primary.100" borderRadius="12px" p={25} mb={7}>
                    <Text fontWeight="bold">
                      Congratulation on winning the awards at this event:
                    </Text>
                    <UnorderedList>
                      {claimablePrizes.map((prize: any, index: number) => (
                        <ListItem key={index} my={2}>
                          {prize.name}
                        </ListItem>
                      ))}
                    </UnorderedList>
                  </Box>
                )}
                <Button
                  isLoading={claimingStatus === CLAIMING_STATUS.CLAIMING}
                  bg={claimable && !claimed ? "primary.700" : "#7f7f7f"}
                  borderRadius={100}
                  color="white"
                  _hover={{ opacity: 0.8 }}
                  _active={{ opacity: 0.9 }}
                  disabled={!claimable || claimed}
                  _disabled={{
                    opacity: 1,
                  }}
                  cursor={claimable && !claimed ? "pointer" : "not-allowed"}
                  mx="20%"
                  mb={5}
                  onClick={claimPrizes(claimablePrizeToken)}
                >
                  {(claimable && claimed) ||
                  claimingStatus === CLAIMING_STATUS.DONE
                    ? "Received"
                    : "Claim"}
                </Button>
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
              <Img src={campaign.holderLogo || bloctoLogo} />
            </Box>
            <Text fontSize="xl" ml={4} color="#7f7f7f">
              {campaign.holder || "Blocto"}
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