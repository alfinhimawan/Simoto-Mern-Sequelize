// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import moment from "moment";
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
import { updateRiwayat_service, getRiwayat_serviceById } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, payload, reload }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [riwayat_service, setRiwayat_service] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // fungsi untuk menambahkan riwayat_service
  const submitHandler = async (values) => {
    setIsLoading(true);
    // membuat object value untuk menampung data yang akan diupdate
    let value = {};
    // jika alias_name yang diinputkan tidak sama dengan alias_name yang ada di database maka tambahkan alias_name ke object value
    if (riwayat_service.alias_name !== values?.alias_name) {
      value.alias_name = values?.alias_name;
    }
    // jika tempat_service yang diinputkan tidak sama dengan tempat_service yang ada di database maka tambahkan tempat_service ke object value
    if (riwayat_service.tempat_service !== values?.tempat_service) {
      value.tempat_service = values?.tempat_service;
    }
    // jika tgl_service_awal yang diinputkan tidak sama dengan tgl_service_awal yang ada di database maka tambahkan tgl_service_awal ke object value
    if (riwayat_service.tgl_service_awal !== values?.tgl_service_awal) {
      value.tgl_service_awal = values?.tgl_service_awal;
    }
    // jika tgl_service_selesai yang diinputkan tidak sama dengan tgl_service_selesai yang ada di database maka tambahkan tgl_service_selesai ke object value
    if (riwayat_service.tgl_service_selesai !== values?.tgl_service_selesai) {
      value.tgl_service_selesai = values?.tgl_service_selesai;
    }
    // jika detail_service yang diinputkan tidak sama dengan detail_service yang ada di database maka tambahkan detail_service ke object value
    if (riwayat_service.detail_service !== values?.detail_service) {
      value.detail_service = values?.detail_service;
    }
    // jika pic yang diinputkan tidak sama dengan pic yang ada di database maka tambahkan pic ke object value
    if (riwayat_service.pic !== values?.pic) {
      value.pic = values?.pic;
    }

    // panggil fungsi updateKendaraam
    const res = await updateRiwayat_service({ values: value, id: payload });
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

  // useEffect untuk mengambil data riwayat_service berdasarkan id
  useEffect(() => {
    if (riwayat_service) {
      reset({
        alias_name: riwayat_service.alias_name,
        tempat_service: riwayat_service.tempat_service,
        tgl_service_awal: moment(riwayat_service.tgl_service_awal, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD'),
        tgl_service_selesai: moment(riwayat_service.tgl_service_selesai, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD'),
        detail_service: riwayat_service.detail_service,
        pic: riwayat_service.pic,
      });
    }
  }, [riwayat_service]);

  // useEffect untuk mengambil data riwayat_service berdasarkan id
  useEffect(() => {
    const getRiwayat_service = async () => {
      const res = await getRiwayat_serviceById(payload);
      setRiwayat_service(res.data);
    };
    getRiwayat_service();
  }, [payload]);

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
          <Heading fontSize={20}>Edit riwayat_service</Heading>
          <Box mt={4}>
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
                  <Input
                   defaultValue={riwayat_service ? moment(riwayat_service.tgl_service_awal, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD') : ''}
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
                  <Input
                    defaultValue={riwayat_service ? moment(riwayat_service.tgl_service_selesai, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD') : ''}
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
              // ketika tombol batal diklik maka akan menjalankan fungsi handleClose
              onClick={handleClose}
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
              // ketika tombol submit diklik maka akan menjalankan fungsi submitHandler
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
