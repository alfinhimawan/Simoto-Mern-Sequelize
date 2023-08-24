// import library yang dibutuhkan
import axios from "axios";
import { BASE_API } from "../../../../utils/constants";
import { getLocalStorage } from "../../../../utils/helper/localStorage";
import { LOCAL_STORAGE_TOKEN } from "../../../../utils/constants";

// fungsi untuk mengambil semua data riwayat_service
export const getAllRiwayat_service = async () => {
  // url untuk mengambil semua data riwayat_service
  const URL = `${BASE_API}/riwayat_service/getAllData`;
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
      // mengembalikan data riwayat_service
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

// fungsi untuk mengambil data riwayat_service berdasarkan id
export const getRiwayat_serviceById = async (id) => {
  // url untuk mengambil data riwayat_service berdasarkan id
  const URL = `${BASE_API}/riwayat_service/getById/${id}`;
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
      // mengembalikan data riwayat_service
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

// fungsi untuk mengambil data riwayat_service berdasarkan nama
export const searchRiwayat_service = async (value) => {
  // url untuk mengambil data riwayat_service berdasarkan nama
  const URL = `${BASE_API}/riwayat_service/search/${value}`;
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
      // mengembalikan data riwayat_service
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

// fungsi untuk mengambil data riwayat_service
export const addRiwayat_service = async (values) => {
  // url untuk menambahkan data riwayat_service
  const URL = `${BASE_API}/riwayat_service/create`;
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
        message: "Berhasil menambahkan riwayat_service",
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

// fungsi untuk mengambil data riwayat_service berdasarkan id
export const updateRiwayat_service = async ({ values, id }) => {
  // url untuk mengubah data riwayat_service berdasarkan id
  const URL = `${BASE_API}/riwayat_service/edit/${id}`;
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
      // mengembalikan data riwayat_service
      return Promise.resolve({
        status: "success",
        message: "Berhasil mengubah riwayat_service",
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

// fungsi untuk menghapus data riwayat_service berdasarkan id
export const deleteRiawayat_service = async (id) => {
  // url untuk menghapus data riwayat_service berdasarkan id
  const URL = `${BASE_API}/riwayat_service/delete/${id}`;
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
      // mengembalikan data riwayat_service
      return Promise.resolve({
        status: "success",
        message: "Berhasil menghapus riwayat_service",
        data: res.data.id_user,
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
