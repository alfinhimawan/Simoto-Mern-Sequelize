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
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { updateKendaraan, getKendaraanById } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, payload, reload }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [kendaraan, setKendaraan] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // fungsi untuk menambahkan kendaraam
  const submitHandler = async (values) => {
    setIsLoading(true);
    // membuat object value untuk menampung data yang akan diupdate
    let value = {};
    // jika nopol yang diinputkan tidak sama dengan nopol yang ada di database maka tambahkan nopol ke object value
    if (kendaraan.nopol !== values?.nopol) {
      value.nopol = values?.nopol;
    }
    // jika alias_name yang diinputkan tidak sama dengan alias_name yang ada di database maka tambahkan alias_name ke object value
    if (kendaraan.alias_name !== values?.alias_name) {
      value.alias_name = values?.alias_name;
    }
    // jika merk yang diinputkan tidak sama dengan merk yang ada di database maka tambahkan merk ke object value
    if (kendaraan.merk !== values?.merk) {
      value.merk = values?.merk;
    }
    // jika jenis yang diinputkan tidak sama dengan jenis yang ada di database maka tambahkan jenis ke object value
    if (kendaraan.jenis !== values?.jenis) {
      value.jenis = values?.jenis;
    }
    // jika tanggal_pajak yang diinputkan tidak sama dengan tanggal_pajak yang ada di database maka tambahkan tanggal_pajak ke object value
    if (kendaraan.tanggal_pajak !== values?.tanggal_pajak) {
      value.tanggal_pajak = values?.tanggal_pajak;
    }
    // jika status yang diinputkan tidak sama dengan status yang ada di database maka tambahkan status ke object value
    if (kendaraan.status !== values?.status) {
      value.status = values?.status;
    }

    // panggil fungsi updateKendaraam
    const res = await updateKendaraan({ values: value, id: payload });
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

  // useEffect untuk mengambil data kendaraan berdasarkan id
  useEffect(() => {
    if (kendaraan) {
      reset({
        nopol: kendaraan.nopol,
        alias_name: kendaraan.alias_name,
        merk: kendaraan.merk,
        jenis: kendaraan.jenis,
        tanggal_pajak: moment(kendaraan.tanggal_pajak, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD'),
        status: kendaraan.status,
      });
    }
  }, [kendaraan]);

  // useEffect untuk mengambil data kendaraan berdasarkan id
  useEffect(() => {
    const getKendaraan = async () => {
      const res = await getKendaraanById(payload);
      setKendaraan(res.data);
    };
    getKendaraan();
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
          <Heading fontSize={20}>Edit Kendaraan</Heading>
          <Box mt={4}>
            <AlertNotification status={status} message={message} />
          </Box>
          <FormControl method="POST">
            <Container gridTemplateRows="repeat(2,1fr)" p={0} my={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                <Flex direction="column">
                  <Input
                    name="nopol"
                    id="nopol"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Nomor Polisi"
                    {...register("nopol", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.nopol?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Nomor Polisi
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"alias_name"}
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
                      Masukkan alias_name
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"jenis"}
                    name="jenis"
                    id="jenis"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Produsen"
                    {...register("jenis", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.jenis?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan jenis
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"merk"}
                    name="merk"
                    id="merk"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Merk"
                    {...register("merk", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.merk?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan merk
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    defaultValue={kendaraan ? moment(kendaraan.tanggal_pajak, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD') : ''}
                    type="date"
                    name="tanggal_pajak"
                    id="tanggal_pajak"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Tanggal Pajak"
                    {...register("tanggal_pajak", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.tanggal_pajak?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan tanggal_pajak
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Select
                    name="status"
                    id="status"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Status"
                    {...register("status", {
                      required: true,
                    })}
                  >
                    <option value="dipakai">dipakai</option>
                    <option value="tidak_dipakai">tidak_dipakai</option>
                  </Select>
                  {errors.status?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan status
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
