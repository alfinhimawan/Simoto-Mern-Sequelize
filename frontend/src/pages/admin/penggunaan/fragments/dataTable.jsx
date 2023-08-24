import React from "react";
import { Badge } from "@chakra-ui/react";
import ActionButton from "./ActionButton";

const columns = [
  {
    title: "Nomor",
    dataIndex: "index",
    key: "id_log_penggunaan",
    width: "15%",
  },
  {
    title: "Kendaraan",
    dataIndex: "id_kendaraan",
    key: "id_kendaraan",
    width: "15%",
  },
  {
    title: "User",
    dataIndex: "id_user",
    key: "id_user",
    width: "15%",
  },
  {
    title: "Pengguna",
    dataIndex: "nama_pengguna",
    key: "nama_pengguna",
    width: "15%",
  },
  {
    title: "Tujuan",
    dataIndex: "tujuan",
    key: "tujuan",
    width: "15%",
  },
  {
    title: "KM_AWAL",
    dataIndex: "km_awal",
    key: "km_awal",
    width: "15%",
  },
  {
    title: "KM_AKHIR",
    dataIndex: "km_akhir",
    key: "km_akhir",
    width: "15%",
  },
  {
    title: "Bensin Awal",
    dataIndex: "bensin_awal",
    key: "bensin_awal",
    width: "15%",
  },
  {
    title: "Bensin Akhir",
    dataIndex: "bensin_akhir",
    key: "bensin_akhir",
    width: "15%",
  },
  {
    title: "Tanggal Berangkat",
    dataIndex: "tgl_berangkat",
    key: "tgl_berangkat",
    width: "15%",
    render: (tgl_berangkat) => (
      tgl_berangkat === null ? ("rung budal cuy"):
      (<span>
        {new Date(tgl_berangkat).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>)
    ),
  },
  {
    title: "Jam Berangkat",
    dataIndex: "jam_berangkat",
    key: "jam_berangkat",
    width: "15%",
  },
  {
    title: "Tanggal Kembali",
    dataIndex: "tgl_kembali",
    key: "tgl_kembali",
    width: "15%",
    render: (tgl_kembali) => (
      tgl_kembali === null ? ("rung mbalik cuy"):
      (<span>
        {new Date(tgl_kembali).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>)
    ),
  },
  {
    title: "Jam Kembali",
    dataIndex: "jam_kembali",
    key: "jam_kembali",
    width: "15%",
  },
  {
    title: "Kondisi",
    dataIndex: "kondisi_kendaraan",
    key: "kondisi_kendaraan",
    width: "15%",
  },
  {
    title: "Keterangan",
    dataIndex: "keterangan",
    key: "keterangan",
    width: "15%",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "15%",
    render: (data) => (
      <Badge
        colorScheme={
          data === "ditolak" ? "red" : data === "telah_diacc" ? "green" : "blue"
        }
      >
        {data}
      </Badge>
    ),
  },
  {
    title: "Aksi",
    key: "aksi",
    width: "15%",
    render: (data) => (
      <ActionButton payload={data.id_log_penggunaan} reload={data.reload} />
    ),
  },
];

export { columns };
