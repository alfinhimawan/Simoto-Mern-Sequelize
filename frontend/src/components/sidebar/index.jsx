import React from "react";
import {
  Box,
  Flex,
  VStack,
  IconButton,
  useDisclosure,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaWhmcs, FaBuildingUser, FaCar } from "react-icons/fa6";
import { X, AlignCenter } from "react-feather";
import NavItem from "./fragments/NavItem";
import Logout from "./fragments/Logout";
import { getLocalStorage } from "../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../utils/constants";
import Logo from "../../assets/image_login.jpg";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dataUser = getLocalStorage(LOCAL_STORAGE_USER);

  return (
    <Box
      w={{ base: "full", md: "15rem" }}
      h={{ base: "auto", md: "full" }}
      bgColor={"white"}
      px={{ base: 4, md: 0 }}
      py={2}
      zIndex={10}
      boxShadow={"2px 0px 20px 2px rgba(0, 0, 0, 0.1)"}
      position={"fixed"}
    >
      <Flex h={16} alignItems={"center"} flexDir={"column"}>
        <Flex
          justifyContent={{
            base: "flex-end",
            md: "space-between",
          }}
          w={"full"}
          my="auto"
          justifyItems={"center"}
          alignItems={"center"}
          mt={{ base: 4, md: 4 }}
          position={"relative"}
        >
          <Box display={{ base: "none", md: "block" }}></Box>
          <Heading
            mx={"auto"}
            color={"purple.600"}
            fontSize={"xl"}
            display={"block"}
            fontFamily={"Poppins"}
          >
            <Image maxWidth={"150px"} src={Logo} alt="logo" />
          </Heading>
          <IconButton
            size={"md"}
            p={2}
            my="auto"
            icon={isOpen ? <X /> : <AlignCenter />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            right={{ base: 6, md: 10 }}
            position={"absolute"}
          />
        </Flex>
        <VStack
          mt={{ base: 4, md: 4 }}
          alignItems={"center"}
          display={{ base: "none", md: "flex" }}
        >
          <Stack w={"full"}>
            <Box w={"full"}>
              {dataUser.role === "admin" && (
                <>
                  <NavItem
                    link={"/dashboard/admin/"}
                    label={"Dashboard"}
                    icon={BsFillGrid1X2Fill}
                  />
                  <NavItem
                    link={"/dashboard/admin/kendaraan"}
                    label={"Kendaraan"}
                    icon={FaCar}
                  />
                  <NavItem
                    link={"/dashboard/admin/user"}
                    label={"User"}
                    icon={FaUserAlt}
                  />
                  <NavItem
                    link={"/dashboard/admin/service"}
                    label={"Service"}
                    icon={FaWhmcs}
                  />
                  <NavItem
                    link={"/dashboard/admin/penggunaan"}
                    label={"Penggunaan"}
                    icon={FaBuildingUser}
                  />
                </>
              )}
              {dataUser.role === "user" && (
                <>
                  <NavItem
                    link={"/dashboard/user/"}
                    label={"Dashboard"}
                    icon={BsFillGrid1X2Fill}
                  />
                  <NavItem
                    link={"/dashboard/user/kendaraan"}
                    label={"Kendaraan"}
                    icon={FaCar}
                  />
                  <NavItem
                    link={"/dashboard/user/penggunaan"}
                    label={"Penggunaan"}
                    icon={FaBuildingUser}
                  />
                </>
              )}
              {dataUser.role === "validator" && (
                <>
                  <NavItem
                    link={"/dashboard/validator/"}
                    label={"Dashboard"}
                    icon={BsFillGrid1X2Fill}
                  />
                  <NavItem
                    link={"/dashboard/validator/penggunaan"}
                    label={"Penggunaan"}
                    icon={FaBuildingUser}
                  />
                </>
              )}
              <Logout />
            </Box>
          </Stack>
        </VStack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={[4]}>
            {dataUser.role === "admin" && (
              <>
                <NavItem
                  link={"/dashboard/admin/"}
                  label={"Dashboard"}
                  icon={BsFillGrid1X2Fill}
                />
                <NavItem
                  link={"/dashboard/admin/kendaraan"}
                  label={"Kendaraan"}
                  icon={FaCar}
                />
                <NavItem
                  link={"/dashboard/admin/user"}
                  label={"Pengguna"}
                  icon={FaUserAlt}
                />
                <NavItem
                  link={"/dashboard/admin/service"}
                  label={"Service"}
                  icon={FaWhmcs}
                />
                <NavItem
                  link={"/dashboard/admin/penggunaan"}
                  label={"Penggunaan"}
                  icon={FaBuildingUser}
                />
              </>
            )}
            {dataUser.role === "user" && (
                <>
                  <NavItem
                    link={"/dashboard/user/"}
                    label={"Dashboard"}
                    icon={BsFillGrid1X2Fill}
                  />
                  <NavItem
                    link={"/dashboard/user/kendaraan"}
                    label={"Kendaraan"}
                    icon={FaCar}
                  />
                  <NavItem
                    link={"/dashboard/user/penggunaan"}
                    label={"Penggunaan"}
                    icon={FaBuildingUser}
                  />
                </>
              )}
              {dataUser.role === "validator" && (
                <>
                  <NavItem
                    link={"/dashboard/validator/"}
                    label={"Dashboard"}
                    icon={BsFillGrid1X2Fill}
                  />
                  <NavItem
                    link={"/dashboard/validator/penggunaan"}
                    label={"Penggunaan"}
                    icon={FaBuildingUser}
                  />
                </>
              )}
            <Logout />
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
