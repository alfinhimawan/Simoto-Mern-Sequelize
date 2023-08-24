// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
``;
import { updateLog_penggunaanByKet, updateLog_penggunaanByAcc } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";

// buat komponen ModalAdd
export default function ModalForm({ isOpen, onClose, reload, logId }) {

  // buat state
  const [keterangan, setKeterangan] = useState("")
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

  const handleAcc = async (status) => {
    const updatedPayload = {
      status,
    };

    const response = await updateLog_penggunaanByAcc({ values: updatedPayload, id: logId });

    console.log(updatedPayload);
    if (response.status === 'success') {
      setStatus('diterima');
      reload();
    } else {
      console.log(response.message);
    }
  };

  const submitHandler = async (values) => {
    // set loading menjadi true
    setIsLoading(true);

    // panggil fungsi updateLog_penggunaanByKet
    const res = await updateLog_penggunaanByKet({values:values.keterangan, id:logId});
    // set message dan status dari respon
    setMessage(res.message);
    setStatus(res.status);

    // jika status respon adalah success
    if (res.status === "success") {
         handleAcc('ditolak');
      // set loading menjadi false dan reset form setelah 500ms
      setTimeout(() => {
        onClose(), reset(), setStatus(""), setMessage(""), reload();
        setIsLoading(false);
      }, 500);
      window.location.reload()
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

  const handleChange = (e) => {
    setKeterangan(e.target.value);
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
            <AlertNotification status={status} message={message} />
          </Box>
          <Flex direction="column">
            <Input
              onChange={handleChange}
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
