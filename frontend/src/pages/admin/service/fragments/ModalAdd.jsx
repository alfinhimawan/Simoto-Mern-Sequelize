// import library yang dibutuhkan
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  Container,
  FormControl,
  Input,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
  Text
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
``;
import { addRiwayat_service } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, reload }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // fungsi untuk menambahkan riwayat_service
  const submitHandler = async (values) => {
    // set loading menjadi true
    setIsLoading(true);

    // panggil fungsi addRiwayat_service
    const res = await addRiwayat_service(values);
    // set message dan status dari respon
    setMessage(res.message);
    setStatus(res.status);

    // jika status respon adalah success
    if (res.status === "success") {
      // set loading menjadi false dan reset form setelah 500ms
      setTimeout(() => {
        onClose(), reset(), setStatus(""), setMessage(""), reload();
        setIsLoading(false);
      }, 500);
      return;
    }
    // jika status respon bukan success
    else {
      // set loading menjadi false dan reset form setelah 1000ms
      setTimeout(() => {
        setIsLoading(false), setMessage(""), setStatus("");
      }, 1000);
    }
  };

  // fungsi untuk menutup modal
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      blockScrollOnMount={false}
      motionPreset="scale"
      size={{ base: "sm", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalBody p={8}>
          <Heading fontSize={20}>Tambah Riwayat Sevice</Heading>
          <Box mt={4}>
            {/* 
              jika status respon bukan success, maka tampilkan alert
            */}
            <AlertNotification status={status} message={message} />
          </Box>
          <FormControl method="POST">
            <Container gridTemplateRows="repeat(2,1fr)" p={0} my={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                <Flex direction="column">
                  <Input
                    name="alias_name"
                    id="alias_name"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Alias Name"
                    {...register("alias_name", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.alias_name?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Alias Name
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"tempat_service"}
                    name="tempat_service"
                    id="tempat_service"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Tempat Service"
                    {...register("tempat_service", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.tempat_service?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan tempat_service
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                <Text fontSize="md" my={0}>
                    Tanggal Service Awal
                  </Text>
                  <Input
                    type={"date"}
                    name="tgl_service_awal"
                    id="tgl_service_awal"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Tanggal Service"
                    {...register("tgl_service_awal", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.tgl_service_awal?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Tanggal Service Awal
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                <Text fontSize="md" my={0}>
                    Tanggal Service Selesai
                  </Text>
                  <Input
                    type={"date"}
                    name="tgl_service_selesai"
                    id="tgl_service_selesai"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Tanggal Service"
                    {...register("tgl_service_selesai", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.tgl_service_selesai?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Tanggal Service Selesai
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type="detail_service"
                    name="detail_service"
                    id="detail_service"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Detail Service"
                    {...register("detail_service", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.detail_service?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Detail Service
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type="pic"
                    name="pic"
                    id="pic"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Pic"
                    {...register("pic", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.pic?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Pic
                    </FormHelperText>
                  )}
                   
                </Flex>
              </Grid>
            </Container>
            <Button
              variant="outline"
              colorScheme={"purple"}
              fontWeight={500}
              px={6}
              borderRadius="lg"
              onClick={handleClose} // panggil fungsi handleClose untuk menutup modal dan mereset form saat tombol batal diklik
            >
              Batal
            </Button>
            <Button
              type="submit"
              ml={4}
              px={6}
              colorScheme={"purple"}
              borderRadius="lg"
              fontWeight={500}
              // panggil fungsi handleSubmit dan submitHandler saat tombol tambah diklik
              onClick={handleSubmit(async (values) => {
                await submitHandler(values);
              })}
              isLoading={isLoading}
            >
              Tambah
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
