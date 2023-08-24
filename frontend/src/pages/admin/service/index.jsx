// Desc: Halaman Kelola RiawayatService
// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import { Box, Flex, Progress, useDisclosure } from "@chakra-ui/react";
import { Input } from "antd";
const { Search } = Input;
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import Table from "../../../components/table";
import { columns } from "./fragments/dataTable";
import ButtonAdd from "../../../components/button/ButtonAdd";
import ModalAdd from "./fragments/ModalAdd";
import { getAllRiwayat_service, searchRiwayat_service } from "./fragments/ApiHandler";

// buat komponen index
export default function index() {
  // buat state
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // state untuk data RiawayatService
  const { isOpen, onOpen, onClose } = useDisclosure(); // buat state untuk modal

  // fungsi untuk mencari RiawayatService
  const handleSearch = async (value) => {
    setLoading(true);
    const res = await searchRiwayat_service(value);
    setData(res.data);
    setLoading(false);
  };

  // fungsi untuk mengambil data RiawayatService
  const getData = async () => {
    setLoading(true);
    const res = await getAllRiwayat_service();
    setData(res.data);
    setLoading(false);
  };

  // ambil data RiawayatService ketika komponen pertama kali di render
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <ModalAdd isOpen={isOpen} onClose={onClose} reload={getData} />
      {/* modal tambah RiawayatService */}
      <Heading text="Kelola Riwayat Service" /> {/* memanggil komponen heading */}
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        my={5}
        gap={5}
        flexDir={{ base: "column", md: "row" }}
      >
        {/* memanggil komponen button add */}
        <ButtonAdd heading={"Tambah Riwayat Service"} onclick={onOpen} />
        <Box w={{ base: "full", md: "auto" }}>
          <Search
            placeholder="Cari Riwayat Service"
            // jika ada perubahan pada input, maka panggil fungsi handleSearch
            onChange={(e) => {
              // jika input kosong, maka panggil fungsi getData
              if (e.target.value === "") {
                getData();
              }
              // jika input tidak kosong, maka panggil fungsi handleSearch
              else {
                handleSearch(e.target.value);
              }
            }}
            style={{ width: "100%" }}
            allowClear={true}
          />
        </Box>
      </Flex>
      <Box my={10} maxW={"100%"}>
        {/*  jika loading true, maka tampilkan progress bar, jika loading false maka tampilkan table */}
        {loading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <Box w={"100%"}>
            <Table
              columns={columns}
              data={data?.map((item, index) => {
                return {
                  ...item,index: index + 1,
                  reload: getData,
                  key: index,
                };
              })}
              pagination={{
                position: ["bottomRight"],
                defaultPageSize: 6,
                showSizeChanger: true,
                pageSizeOptions: ["3", "5", "10"],
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} dari ${total} items`,
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}
