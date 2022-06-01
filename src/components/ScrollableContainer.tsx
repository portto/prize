import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, ChakraProps, IconButton } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ScrollableContainerProps extends ChakraProps {
  children: any;
}

const ScrollableContainer = ({
  children,
  ...rest
}: ScrollableContainerProps) => {
  const [scrollWidth, setScrollWidth] = useState(0);
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);
  const ref = useRef(null);
  const scroll = useCallback(
    (direction: "left" | "right") => () => {
      const element = ref.current as any;
      const scrollLeft = element.scrollLeft;
      const clientWidth = element.clientWidth;
      element.scrollTo({
        left: scrollLeft + (direction === "left" ? -clientWidth : clientWidth),
        behavior: "smooth",
      });
    },
    []
  );

  useEffect(() => {
    const element = ref.current as any;
    if (!element) return;
    const observer = new ResizeObserver((entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.contentRect) {
          setScrollWidth(element.scrollWidth);
        }
      });
    });
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  useEffect(() => {
    const element = ref.current as any;
    if (!element) return;
    const scrollDetector = () => {
      setShowLeft(element.scrollLeft > 50);
      setShowRight(
        element.scrollWidth - element.clientWidth > element.scrollLeft + 50
      );
    };
    scrollDetector();
    const listener = element.addEventListener("scroll", scrollDetector);
    return () => element.removeEventListener("scroll", listener);
  }, [scrollWidth]);

  return (
    <Box
      role="group"
      ref={ref}
      __css={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      overflow="auto"
      whiteSpace="nowrap"
      position="relative"
      {...rest}
    >
      <IconButton
        pos="sticky"
        marginLeft={-10}
        width={10}
        height={10}
        bg="white"
        bottom="45%"
        left="10px"
        borderRadius="50%"
        opacity={showLeft ? 1 : 0}
        transition="all .2s"
        icon={<ChevronLeftIcon />}
        color="#7f7f7f"
        boxShadow="0px 0px 20px rgb(0 0 0 / 5%)"
        _hover={{
          opacity: 0.8,
          bg: "white",
          transform: "scale(0.98)",
        }}
        aria-label="move left"
        onClick={scroll("left")}
      />
      {children}
      <IconButton
        pos="sticky"
        width={10}
        height={10}
        bg="white"
        right="0"
        bottom="45%"
        borderRadius="50%"
        opacity={showRight ? 1 : 0}
        transition="all .2s"
        icon={<ChevronRightIcon />}
        color="#7f7f7f"
        boxShadow="0px 0px 20px rgb(0 0 0 / 5%)"
        aria-label="move right"
        onClick={scroll("right")}
        _hover={{
          opacity: 0.8,
          bg: "white",
          transform: "scale(0.98)",
        }}
      />
    </Box>
  );
};

export default ScrollableContainer;
