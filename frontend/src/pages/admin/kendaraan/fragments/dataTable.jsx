import React from "react";
import ActionButton from "./ActionButton";
import { Badge } from "@chakra-ui/react";

const columns = [
  {
    title: "Nomor",
    dataIndex: "index",
    key: "id_kendaraan",
    width: "15%",
  },
  {
    title: "Nomor Polisi",
    dataIndex: "nopol",
    key: "nopol",
    width: "15%",
  },
  {
    title: "Alias Name",
    dataIndex: "alias_name",
    key: "alias_name",
    width: "15%",
  },
  {
    title: "Produsen",
    dataIndex: "jenis",
    key: "jenis",
    width: "15%",
  },
  {
    title: "Merk",
    dataIndex: "merk",
    key: "merk",
    width: "15%",
  },
  {
    title: "Tanggal Pajak",
    dataIndex: "tanggal_pajak",
    key: "tanggal_pajak",
    width: "15%",
    render: (tanggal_pajak) => (
      <span>
        {new Date(tanggal_pajak).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "15%",
    render: (data) => (
      <Badge colorScheme={data === "dipakai" ? "red" : "green"}>{data}</Badge>
    ),
  },
  // {
  //   title: "Kondisi",
  //   dataIndex: "kondisi_kendaraan",
  //   key: "kondisi_kendaraan",
  //   width: "15%"
  // },
  {
    title: "Aksi",
    key: "aksi",
    width: "15%",
    render: (data) => (
      <ActionButton payload={data.id_kendaraan} reload={data.reload} />
    ),
  },
];

export { columns };
