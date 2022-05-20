import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import Hamburger from "hamburger-react";
import { useCallback, useContext, useState } from "react";
import AuthContext from "../context/auth";
import Wallet from "./icons/Wallet";

const HEADER_HEIGHT = 76;

interface WalletConnectProps {
  address: string;
  login: () => void;
  logout: () => void;
  copyAddress: () => void;
}

const WalletConnectDesktop = ({
  address,
  login,
  logout,
  copyAddress,
}: WalletConnectProps) =>
  address ? (
    <Menu>
      <MenuButton
        as={Button}
        bg="primary.700"
        borderRadius={100}
        _hover={{ opacity: 0.8 }}
        _active={{ opacity: 0.9 }}
      >
        <Flex>
          <Wallet fill="white" />
          <Text ml={2} color="white">
            {address || "Connect Wallet"}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuGroup title="Your Address" ml={3}>
          <MenuItem color="#7f7f7f" onClick={copyAddress}>
            {address} <CopyIcon m={3} />
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={logout}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Button bg="primary.700" borderRadius={100} onClick={login}>
      <Wallet fill="white" />
      <Text ml={2} color="white">
        Connect Wallet
      </Text>
    </Button>
  );

const WalletConnectMobile = ({
  address,
  login,
  logout,
  copyAddress,
}: WalletConnectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Hamburger toggled={open} toggle={setOpen} size={18} />
      <Flex
        justify="space-between"
        align="center"
        height={address ? HEADER_HEIGHT * 1.5 : HEADER_HEIGHT}
        bg="rgba(255, 255, 255, 0.8)"
        px={3}
        boxShadow="0px 0px 2px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(4px)"
        pos="fixed"
        top={HEADER_HEIGHT}
        left={0}
        right={0}
        transform={open ? "translateY(0)" : "translateY(-50%)"}
        opacity={open ? 1 : 0}
        pointerEvents={open ? "auto" : "none"}
        transition="transform .2s ease-out, opacity .2s ease-out"
      >
        {address ? (
          <Flex direction="column" align="stretch" width="100%">
            <Box py={2} role="button" onClick={copyAddress}>
              <Text fontWeight="semibold">Your Address</Text>
              <Flex align="center" color="#7f7f7f">
                {address}
                <CopyIcon ml={2} />
              </Flex>
            </Box>

            <Flex py={2} role="button" onClick={logout}>
              Sign out
            </Flex>
          </Flex>
        ) : (
          <Button bg="primary.700" borderRadius={100} onClick={login} flex="1">
            <Wallet fill="white" />
            <Text ml={2} color="white">
              Connect Wallet
            </Text>
          </Button>
        )}
      </Flex>
    </>
  );
};

const WalletConnect = () => {
  const { login, logout, user } = useContext(AuthContext);
  const address = user?.addr;

  const toast = useToast();

  const copyAddress = useCallback(() => {
    window.navigator.clipboard
      .writeText(address || "")
      .then(() =>
        toast({ title: "Address copied!", status: "success", duration: 2000 })
      );
  }, [address, toast]);

  const [isDesktop] = useMediaQuery("(min-width: 768px)");

  const walletConnectProps = { address, login, logout, copyAddress };

  return isDesktop ? (
    <WalletConnectDesktop {...walletConnectProps} />
  ) : (
    <WalletConnectMobile {...walletConnectProps} />
  );
};

export default WalletConnect;
