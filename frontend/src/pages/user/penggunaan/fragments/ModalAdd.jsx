// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { addlog_penggunaan } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, reload }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [dataUser, setdataUser] = useState({})
  useEffect(() => {
    setdataUser(JSON.parse(window.localStorage.getItem("appKendaraan/user"))) 
  },[])
  console.log(dataUser.nama_karyawan)
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
    const res = await addlog_penggunaan(values);
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
          <Heading fontSize={20}>Input</Heading>
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
                    name="id_kendaraan"
                    id="id_kendaraan"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Id Kendaraan"
                    {...register("id_kendaraan", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.id_kendaraan?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Id_kendaraan
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    defaultValue={dataUser.id_user}
                    name="id_user"
                    id="id_user"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Id User"
                    {...register("id_user", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.id_user?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Id User
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    defaultValue={dataUser.nama_karyawan}
                    type={"nama_pengguna"}
                    name="nama_pengguna"
                    id="nama_pengguna"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Nama Pengguna"
                    {...register("nama_pengguna", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.nama_pengguna?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Nama Pengguna
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"tujuan"}
                    name="tujuan"
                    id="tujuan"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Tujuan"
                    {...register("tujuan", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.tujuan?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Tujuan
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"km_awal"}
                    name="km_awal"
                    id="km_awal"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="KM AWAL"
                    {...register("km_awal", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.km_awal?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan KM AWAL
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"km_akhir"}
                    name="km_akhir"
                    id="km_akhir"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="KM AKHIR"
                    {...register("km_akhir", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.km_akhir?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan KM AKHIR
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"bensin_awal"}
                    name="bensin_awal"
                    id="bensin_awal"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Bensin Awal"
                    {...register("bensin_awal", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.bensin_awal?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Bensin Awal
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"bensin_akhir"}
                    name="bensin_akhir"
                    id="bensin_akhir"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Bensin Akhir"
                    {...register("bensin_akhir", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.bensin_akhir?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Bensin Akhir
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type="kondisi"
                    name="kondisi"
                    id="kondisi"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Kondisi Kendaraan"
                    {...register("kondisi", {
                      required: true,
                    })}
                  />
                  {errors.kondisi?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Detail Service
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
              // panggil fungsi handleSubmit dan submitHandler saat tombol kirim diklik
              onClick={handleSubmit(async (values) => {
                await submitHandler(values);
              })}
              isLoading={isLoading}
            >
              Kirim
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
