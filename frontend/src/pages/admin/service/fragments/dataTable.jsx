import React from "react";
import ActionButton from "./ActionButton";
// import { Badge } from "@chakra-ui/react";

const columns = [
  {
    title: "Nomor",
    dataIndex: "index",
    key: "id_riwayat_service",
    width: "15%",
  },
  {
    title: "Alias Name",
    dataIndex: "alias_name",
    key: "alias_name",
    width: "15%",
  },
  {
    title: "Tempat Service",
    dataIndex: "tempat_service",
    key: "tempat_service",
    width: "15%",
  },
  {
    title: "Tanggal Awal",
    dataIndex: "tgl_service_awal",
    key: "tgl_service_awal",
    width: "15%",
    render: (tgl_service_awal) => (
      <span>
        {new Date(tgl_service_awal).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    title: "Tanggal Selesai",
    dataIndex: "tgl_service_selesai",
    key: "tgl_service_selesai",
    width: "15%",
    render: (tgl_service_selesai) => (
      <span>
        {new Date(tgl_service_selesai).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    ),
  },
  {
    title: "Detail Service",
    dataIndex: "detail_service",
    key: "detail_service",
    width: "15%",
  },
  {
    title: "PIC",
    dataIndex: "pic",
    key: "pic",
    width: "15%",
  },
  {
    title: "Aksi",
    key: "aksi",
    width: "15%",
    render: (data) => (
      <ActionButton payload={data.id_riwayat_service} reload={data.reload} />
    ),
  },
];

export { columns };
