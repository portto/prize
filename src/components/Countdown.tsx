import { Box, ChakraProps, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";

interface CountdownProps extends ChakraProps {
  endTime: any;
  active?: boolean;
  size?: "sm" | "lg";
}

const Countdown = ({
  endTime,
  active = false,
  size = "sm",
  ...rest
}: CountdownProps) => {
  const dayRef = useRef(null);
  const hourRef = useRef(null);
  const minRef = useRef(null);
  const secondRef = useRef(null);
  useEffect(() => {
    if (endTime.isBefore(dayjs())) {
      (dayRef.current as any).innerHTML = "00";
      (hourRef.current as any).innerHTML = "00";
      (minRef.current as any).innerHTML = "00";
      (secondRef.current as any).innerHTML = "00";
      return;
    }
    const update = () => {
      const now = dayjs();
      if (endTime.diff(now) < 0) return;
      (dayRef.current as any).innerHTML = endTime
        .diff(now, "day")
        .toString()
        .padStart(2, "0");
      (hourRef.current as any).innerHTML = (endTime.diff(now, "hour") % 24)
        .toString()
        .padStart(2, "0");
      (minRef.current as any).innerHTML = (endTime.diff(now, "minute") % 60)
        .toString()
        .padStart(2, "0");
      (secondRef.current as any).innerHTML = (endTime.diff(now, "second") % 60)
        .toString()
        .padStart(2, "0");
    };
    const interval = setInterval(update, 1000);
    update();
    return () => clearInterval(interval);
  }, [endTime]);
  return (
    <Flex
      align="center"
      justify="space-between"
      bg="#F9F9F9"
      borderRadius={size === "sm" ? 8 : 12}
      p={size === "sm" ? 3 : 5}
      {...rest}
    >
      <Box textAlign="center" flex={1}>
        <Text
          ref={dayRef}
          fontWeight="bold"
          fontSize={size === "sm" ? "md" : "3xl"}
          color={active ? "#0A94FF" : "#141414"}
        >
          --
        </Text>
        <Text color="#7F7F7F">days</Text>
      </Box>
      <Box
        width="1px"
        height={size === "sm" ? "35px" : "67px"}
        bg="#efefef"
        flexBasis="1px"
      />
      <Box textAlign="center" flex={1}>
        <Text
          ref={hourRef}
          fontWeight="bold"
          fontSize={size === "sm" ? "md" : "3xl"}
          color={active ? "#0A94FF" : "#141414"}
        >
          --
        </Text>
        <Text color="#7F7F7F">hours</Text>
      </Box>
      <Box
        width="1px"
        height={size === "sm" ? "35px" : "67px"}
        bg="#efefef"
        flexBasis="1px"
      />
      <Box textAlign="center" flex={1}>
        <Text
          ref={minRef}
          fontWeight="bold"
          fontSize={size === "sm" ? "md" : "3xl"}
          color={active ? "#0A94FF" : "#141414"}
        >
          --
        </Text>
        <Text color="#7F7F7F">mins</Text>
      </Box>
      <Box
        width="1px"
        height={size === "sm" ? "35px" : "67px"}
        bg="#efefef"
        flexBasis="1px"
      />
      <Box textAlign="center" flex={1}>
        <Text
          ref={secondRef}
          fontWeight="bold"
          fontSize={size === "sm" ? "md" : "3xl"}
          color={active ? "#0A94FF" : "#141414"}
        >
          --
        </Text>
        <Text color="#7F7F7F">secs</Text>
      </Box>
    </Flex>
  );
};

export default Countdown;
