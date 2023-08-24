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
import { updateLog_penggunaanByAcc } from "./ApiHandler";
import ImageAcc from "../../../../assets/image-acc.jpeg";
import ModalForm from "./ModalForm";
// buat komponen ModalBayar
export default function ModalAcc({ isOpen, onClose, payload, reload }) {
  const [status, setStatus] = useState(payload);
  const [openModalForm, setOpenModalForm] =useState(false)


  const handleAcc = async (status) => {
    const updatedPayload = {
      ...payload,
      status,
    };

    const response = await updateLog_penggunaanByAcc({ values: updatedPayload, id: payload });

    console.log(updatedPayload);
    if (response.status === 'success') {
      setStatus('diterima');
      reload();
    } else {
      console.log(response.message);
    }
  };

  const handleBatal = () => {
    setOpenModalForm(true)
    // handleAcc('ditolak');
  };

  const handleClose = () => {
    setOpenModalForm(false)
  };

  const handleTerima = () => {
    handleAcc('telah_diacc');
  };
  return (
    <>
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
              src={ImageAcc}
              alt={"image acc"}
              w={["80%", "70%", "60%"]}
            />
          </Center>
          <Text fontFamily={"Poppins"} as="h3" fontSize={"lg"} fontWeight={600}>
            Agreement
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
            onClick={handleBatal}
            borderRadius="lg"
            fontWeight={500}
          >
            Tolak
          </Button>
          <Button
            size={"md"}
            borderRadius="lg"
            colorScheme={"green"}
            fontWeight={500}
            onClick={handleTerima}
          >
            Acc
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    {openModalForm && <ModalForm isOpen={openModalForm} onClose={handleClose} logId={payload}/>}</>
  );
}
