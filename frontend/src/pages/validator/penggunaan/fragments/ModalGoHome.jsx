import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Center,
  Image,
} from "@chakra-ui/react";
import { updateLog_penggunaanByGo } from "./ApiHandler";
import ImageGoHome from "../../../../assets/logo_GoHome.png";
// buat komponen ModalBayar
export default function ModalGoHome({ isOpen, onClose, payload, reload }) {
  const [status, setStatus] = useState(payload);

  const handleAcc = async (status) => {
    const updatedPayload = {
      ...payload,
      status,
    };

    const response = await updateLog_penggunaanByGo({ values: updatedPayload, id: payload });

    console.log(updatedPayload);
    if (response.status === 'success') {
      setStatus('diterima');
      reload();
    } else {
      console.log(response.message);
    }
  };

  const handleBerangkat = () => {
    handleAcc('berangkat');
  };

  const handleKembali = () => {
    handleAcc('kembali');
  };
  return (
    <Modal
      size={{ base: "xs", md: "sm" }}
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="3xl" py={8}>
        <ModalBody alignItems="center" textAlign="center">
          <Center>
            <Image
              src={ImageGoHome}
              alt={"image gohome"}
              w={["80%", "70%", "60%"]}
            />
          </Center>
          <Text fontFamily={"Poppins"} as="h3" fontSize={"lg"} fontWeight={600}>
            GoHome
          </Text>
          <Text fontFamily={"Poppins"} as="h6" fontSize={"xs"} fontWeight={400}>
            Apakah yakin?
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            variant={"outline"}
            colorScheme={"red"}
            size={"md"}
            mr={3}
            // ketika tombol batal diklik, panggil fungsi onClose
            onClick={onClose}
            borderRadius="lg"
            fontWeight={500}
          >
            Batal
          </Button>
          <Button
            colorScheme={"red"}
            size={"md"}
            mr={3}
            onClick={handleBerangkat}
            borderRadius="lg"
            fontWeight={500}
          >
            Berangkat
          </Button>
          <Button
            size={"md"}
            borderRadius="lg"
            colorScheme={"green"}
            fontWeight={500}
            onClick={handleKembali}
          >
            Kembali
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
