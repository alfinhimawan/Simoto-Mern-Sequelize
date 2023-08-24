// Desc: Halaman Kelola Kendaraan
// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import { Box, Flex, Progress, useDisclosure } from "@chakra-ui/react";
import { Input } from "antd";
const { Search } = Input;
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import Table from "../../../components/table";
import { columns } from "./fragments/dataTable";
import { getAllKendaraan, searchKendaraan } from "./fragments/ApiHandler";

// buat komponen index
export default function index() {
  // buat state
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // state untuk data Kendaraan

  // fungsi untuk mencari Kendaraan
  const handleSearch = async (value) => {
    setLoading(true);
    const res = await searchKendaraan(value);
    setData(res.data);
    setLoading(false);
  };

  // fungsi untuk mengambil data Kendaraan
  const getData = async () => {
    setLoading(true);
    const res = await getAllKendaraan();
    setData(res.data);
    setLoading(false);
  };

  // ambil data Kendaraan ketika komponen pertama kali di render
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Heading text="Daftar Kendaraan Operasional" /> {/* memanggil komponen heading */}
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        my={5}
        gap={5}
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "full", md: "auto" }}>
          <Search
            placeholder="Cari Kendaraan"
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
                  ...item,
                  index: index + 1,
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
