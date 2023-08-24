import React from "react";
import ActionButton from "./ActionButton";

const columns = [
  {
    title: "Nomor",
    dataIndex: "index",
    key: "id_user",
    width: "15%",
  },
  {
    title: "Departemen",
    dataIndex: "departemen",
    key: "departemen",
    width: "15%",
  },
  {
    title: "Nama Karyawan",
    dataIndex: "nama_karyawan",
    key: "nama_karyawan",
    width: "15%",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: "15%",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "15%",
  },
  {
    title: "Aksi",
    key: "aksi",
    width: "15%",
    render: (data) => (
      <ActionButton payload={data.id_user} reload={data.reload} />
    ),
  },
];

export { columns };
