// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import moment from "moment"
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
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { updateLog_penggunaan, getlog_penggunaanById } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, payload, reload }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [log_penggunaan, setLog_penggunaan] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // fungsi untuk menambahkan log_penggunaan
  const submitHandler = async (values) => {
    setIsLoading(true);
    // membuat object value untuk menampung data yang akan diupdate
    let value = {};
    // jika id_kendaraan yang diinputkan tidak sama dengan id_kendaraan yang ada di database maka tambahkan id_kendaraan ke object value
    if (log_penggunaan.id_kendaraan !== values?.id_kendaraan) {
      value.id_kendaraan = values?.id_kendaraan;
    }
    // jika id_user yang diinputkan tidak sama dengan id_user yang ada di database maka tambahkan id_user ke object value
    if (log_penggunaan.id_user !== values?.id_user) {
      value.id_user = values?.id_user;
    }
    // jika nama_pengguna yang diinputkan tidak sama dengan nama_pengguna yang ada di database maka tambahkan nama_pengguna ke object value
    if (log_penggunaan.nama_pengguna !== values?.nama_pengguna) {
      value.nama_pengguna = values?.nama_pengguna;
    }
    // jika tujuan yang diinputkan tidak sama dengan tujuan yang ada di database maka tambahkan tujuan ke object value
    if (log_penggunaan.tujuan !== values?.tujuan) {
      value.tujuan = values?.tujuan;
    }
    // jika km_awal yang diinputkan tidak sama dengan km_awal yang ada di database maka tambahkan km_awal ke object value
    if (log_penggunaan.km_awal !== values?.km_awal) {
      value.km_awal = values?.km_awal;
    }
    // jika km_akhir yang diinputkan tidak sama dengan km_akhir yang ada di database maka tambahkan km_akhir ke object value
    if (log_penggunaan.km_akhir !== values?.km_akhir) {
      value.km_akhir = values?.km_akhir;
    }
    // jika bensin_awal yang diinputkan tidak sama dengan bensin_awal yang ada di database maka tambahkan bensin_awal ke object value
    if (log_penggunaan.bensin_awal !== values?.bensin_awal) {
        value.bensin_awal = values?.bensin_awal;
    }
    // jika bensin_akhir yang diinputkan tidak sama dengan bensin_akhir yang ada di database maka tambahkan bensin_akhir ke object value
    if (log_penggunaan.bensin_akhir !== values?.bensin_akhir) {
      value.bensin_akhir = values?.bensin_akhir;
    }
    // jika tgl_berangkat yang diinputkan tidak sama dengan tgl_berangkat yang ada di database maka tambahkan tgl_berangkat ke object value
    if (log_penggunaan.tgl_berangkat !== values?.tgl_berangkat) {
      value.tgl_berangkat = values?.tgl_berangkat;
    }
    // jika jam_berangkat yang diinputkan tidak sama dengan jam_berangkat yang ada di database maka tambahkan jam_berangkat ke object value
    if (log_penggunaan.jam_berangkat !== values?.jam_berangkat) {
      value.jam_berangkat = values?.jam_berangkat;
    }
    // jika tgl_kembali yang diinputkan tidak sama dengan tgl_kembali yang ada di database maka tambahkan tgl_kembali ke object value
    if (log_penggunaan.tgl_kembali !== values?.tgl_kembali) {
      value.tgl_kembali = values?.tgl_kembali;
    }
    // jika jam_kembali yang diinputkan tidak sama dengan jam_kembali yang ada di database maka tambahkan jam_kembali ke object value
    if (log_penggunaan.jam_kembali !== values?.jam_kembali) {
      value.jam_kembali = values?.jam_kembali;
    }
    // jika kondisi yang diinputkan tidak sama dengan kondisi yang ada di database maka tambahkan kondisi ke object value
    if (log_penggunaan.kondisi !== values?.kondisi) {
      value.kondisi = values?.kondisi;
    }
    // jika keterangan yang diinputkan tidak sama dengan keterangan yang ada di database maka tambahkan keterangan ke object value
    if (log_penggunaan.keterangan !== values?.keterangan) {
      value.keterangan = values?.keterangan;
    }
    // jika status yang diinputkan tidak sama dengan status yang ada di database maka tambahkan status ke object value
    if (log_penggunaan.status !== values?.status) {
      value.status = values?.status;
    }

    // panggil fungsi updateKendaraam
    const res = await updateLog_penggunaan({ values: value, id: payload });
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

  // useEffect untuk mengambil data log_penggunaan berdasarkan id
  useEffect(() => {
    if (log_penggunaan) {
      reset({
        id_kendaraan: log_penggunaan.id_kendaraan,
        id_user: log_penggunaan.id_user,
        nama_pengguna: log_penggunaan.nama_pengguna,
        tujuan: log_penggunaan.tujuan,
        km_awal: log_penggunaan.km_awal,
        km_akhir: log_penggunaan.km_akhir,
        bensin_awal: log_penggunaan.bensin_awal,
        bensin_akhir: log_penggunaan.bensin_akhir,
        tgl_berangkat: moment(log_penggunaan.tgl_berangkat, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD'),
        jam_berangkat: log_penggunaan.jam_berangkat,
        tgl_kembali: moment(log_penggunaan.tgl_kembali, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD'),
        jam_kembali: log_penggunaan.jam_kembali,
        kondisi: log_penggunaan.kondisi,
        keterangan: log_penggunaan.keterangan,
        status: log_penggunaan.status,
      });
    }
  }, [log_penggunaan]);

  // useEffect untuk mengambil data log_penggunaan berdasarkan id
  useEffect(() => {
    const getLog_penggunaan = async () => {
      const res = await getlog_penggunaanById(payload);
      setLog_penggunaan(res.data);
    };
    getLog_penggunaan();
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
          <Heading fontSize={20}>Edit Log Penggunaan</Heading>
          <Box mt={4}>
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
                  {errors.nama_karyawan?.type === "required" && (
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
                <Text fontSize="md" my={0}>
                    Tanggal Berangkat
                  </Text>
                  <Input
                    defaultValue={log_penggunaan ? moment(log_penggunaan.tgl_berangkat, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD') : ''}
                    type={"date"}
                    name="tgl_berangkat"
                    id="tgl_berangkat"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Tanggal Berangkat"
                    {...register("tgl_berangkat", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.tgl_berangkat?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Tanggal Berangkat
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                <Text fontSize="md" my={0}>
                    Jam Berangkat
                  </Text>
                  <Input
                    type={"time"}
                    name="jam_berangkat"
                    id="jam_berangkat"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Jam Berangkat"
                    {...register("jam_berangkat", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.jam_berangkat?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Jam Berangkat
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                <Text fontSize="md" my={0}>
                    Tanggal Kembali
                  </Text>
                  <Input
                  defaultValue={log_penggunaan ? moment(log_penggunaan.tgl_kembali, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD') : ''}
                    type={"date"}
                    name="tgl_kembali"
                    id="tgl_kembali"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Tanggal Kembali"
                    {...register("tgl_kembali", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.tgl_kembali?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Tanggal Kembali
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                <Text fontSize="md" my={0}>
                    Jam Kembali
                  </Text>
                  <Input
                    type={"time"}
                    name="jam_kembali"
                    id="jam_kembali"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Jam Kembali"
                    {...register("jam_kembali", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.jam_kembali?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Jam Kembali
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
                    placeholder="Kondisi"
                    {...register("kondisi", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.kondisi?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Kondisi Kendaraan
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type="keterangan"
                    name="keterangan"
                    id="keterangan"
                    borderRadius="lg"
                    focusBorderColor="purple.600"
                    placeholder="Keterangan"
                    {...register("keterangan", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.keterangan?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Keterangan
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
