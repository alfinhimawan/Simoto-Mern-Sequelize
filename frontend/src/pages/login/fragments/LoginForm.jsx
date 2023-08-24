// import library yang dibutuhkan
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-feather";
import {
  Button,
  Box,
  Heading,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  FormHelperText,
  Text,
} from "@chakra-ui/react";
import loginHandler from "./LoginHandler";
import AlertNotification from "../../../components/alert";

// buat komponen LoginForm
export default function LoginForm() {
  // buat state
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  // buat fungsi untuk menampilkan password
  const handleClick = () => setShow(!show);
  // buat fungsi untuk navigasi
  const navigate = useNavigate();
  // buat fungsi untuk validasi form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // buat fungsi untuk submit form
  const submitHandler = async (values) => {
    // set state loading menjadi true
    setIsLoading(true);
    // jalankan fungsi loginHandler
    const res = await loginHandler(values);
    // set state message dan status
    setMessage(res.message);
    setStatus(res.status);

    // set timeout untuk menampilkan pesan
    setTimeout(() => {
      // cek jika status sukses
      if (res.status === "success") {
        // cek jika role admin
        if (res.data.role === "admin") {
          // navigasi ke halaman dashboard admin
          navigate("/dashboard/admin/");
          // cek jika role user
        } else if (res.data.role === "user") {
          // navigasi ke halaman dashboard user
          navigate("/dashboard/user/");
          // cek jika role validator
        } else {
          // navigasi ke halaman dashboard validator
          navigate("/dashboard/validator/");
        }
      }
      // set state message dan status menjadi kosong
      setMessage("");
      setStatus("");
      // set state loading menjadi false
      setIsLoading(false);
    }, 1500); // set timeout 1.5 detik
    // set state loading menjadi false
    setIsLoading(false);
  };

  return (
    <Box width={{ lg: "70%" }} mx={"auto"}>
      {/*  jika status sukses, tampilkan alert notifikasi */}
      <AlertNotification status={status} message={message} />
      <Box mt={4}>
        <Heading fontWeight={600} color="purple.600">
          Masuk
        </Heading>
        <Text fontSize="md" my={3}>
          Silahkan Masukan Email dan Password Anda Telebih Dahulu
        </Text>
      </Box>
      <Box>
        <FormControl method="POST">
          <Input
            type="email"
            name="email"
            id="email"
            borderRadius="full"
            focusBorderColor="purple.600"
            placeholder="Email"
            {...register("email", { required: true })} // validasi form
          />
          {/*  jika error email, tampilkan pesan error */}
          {errors.email?.type === "required" && (
            <FormHelperText textColor="red" mb={4}>
              Masukkan email
            </FormHelperText>
          )}
          <InputGroup mt={4}>
            <Input
              type={show ? "text" : "password"} // tampilkan password jika state show true
              name="password"
              id="password"
              borderRadius="full"
              focusBorderColor="purple.600"
              placeholder="Password"
              {...register("password", {
                required: true, // validasi tidak boleh kosong
                minLength: 8, // validasi minimal 8 karakter
              })} // validasi form
            />
            <InputRightElement>
              <IconButton
                borderRadius="full"
                size="sm"
                variant="ghost"
                mr={[2, 6, 10]}
                onClick={handleClick}
                aria-label={"whod hide"}
                icon={show ? <EyeOff /> : <Eye />} // tampilkan icon eye jika state show true dan sebaliknya
              />
            </InputRightElement>
          </InputGroup>
          {/*  jika error password, tampilkan pesan error */}
          {errors.password?.type === "required" && (
            <FormHelperText textColor="red">Masukkan password</FormHelperText>
          )}
          {errors.password?.type === "minLength" && (
            <FormHelperText textColor="red">
              Password minimal 8 karakter
            </FormHelperText>
          )}
          <Button
            mt={8}
            bg="purple.600"
            color="white"
            isLoading={isLoading}
            type="submit"
            w="full"
            borderRadius="full"
            borderWidth={2}
            borderColor="purple.600"
            _hover={{
              bg: "white",
              color: "purple.600",
              borderColor: "purple.600",
            }}
            // submit form
            onClick={handleSubmit(async (values) => {
              await submitHandler(values); // jalankan fungsi submitHandler
            })}
          >
            Masuk
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
