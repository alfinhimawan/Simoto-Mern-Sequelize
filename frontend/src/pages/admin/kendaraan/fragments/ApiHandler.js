// import library yang dibutuhkan
import axios from "axios";
import { BASE_API } from "../../../../utils/constants";
import { getLocalStorage } from "../../../../utils/helper/localStorage";
import { LOCAL_STORAGE_TOKEN } from "../../../../utils/constants";

// fungsi untuk mengambil semua data kendaraan
export const getAllKendaraan = async () => {
  // url untuk mengambil semua data kendaraan
  const URL = `${BASE_API}/kendaraan/getAllData`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.get(URL, {
      // menambahkan header Authorization
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data kendaraan
      return Promise.resolve({
        status: "success",
        data: res.data,
      });
    }
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
};

// fungsi untuk mengambil data kendaraan berdasarkan id
export const getKendaraanById = async (id) => {
  // url untuk mengambil data kendaraan berdasarkan id
  const URL = `${BASE_API}/kendaraan/getById/${id}`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data kendaraan
      return Promise.resolve({
        status: "success",
        data: res.data,
      });
    }
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
};

// fungsi untuk mengambil data kendaraan berdasarkan nama
export const searchKendaraan = async (value) => {
  // url untuk mengambil data kendaraan berdasarkan nama
  const URL = `${BASE_API}/kendaraan/search/${value}`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.get(URL, {
      // menambahkan header Authorization
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data kendaraan
      return Promise.resolve({
        status: "success",
        data: res.data,
      });
    }
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
};

// fungsi untuk mengambil data kendaraan
export const addKendaraan = async (values) => {
  // url untuk menambahkan data kendaraan
  const URL = `${BASE_API}/kendaraan/create`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.post(URL, values, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      return Promise.resolve({
        status: "success",
        message: "Berhasil menambahkan kendaraan",
        data: res.data,
      });
    }
  } catch (err) {
    console.log(err);
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err?.response?.data?.message,
    });
  }
};

// fungsi untuk mengambil data kendaraan berdasarkan id
export const updateKendaraan = async ({ values, id }) => {
  // url untuk mengubah data kendaraan berdasarkan id
  const URL = `${BASE_API}/kendaraan/edit/${id}`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.put(URL, values, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data kendaraan
      return Promise.resolve({
        status: "success",
        message: "Berhasil mengubah kendaraan",
        data: res.data,
      });
    }
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err?.response?.data?.message,
    });
  }
};

// fungsi untuk menghapus data kendaraan berdasarkan id
export const deleteKendaraan = async (id) => {
  // url untuk menghapus data kendaraan berdasarkan id
  const URL = `${BASE_API}/kendaraan/delete/${id}`;
  try {
    // melakukan request ke server
    const data = await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data kendaraan
      return Promise.resolve({
        status: "success",
        message: "Berhasil menghapus kendaraan",
        data: res.data.id_kendaraan,
      });
    }
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
};
