// import library yang dibutuhkan
import axios from "axios";
import { BASE_API } from "../../../../utils/constants";
import { getLocalStorage } from "../../../../utils/helper/localStorage";
import { LOCAL_STORAGE_TOKEN } from "../../../../utils/constants";

// fungsi untuk mengambil semua data log_penggunaan
export const getAll_log_penggunaan = async () => {
  // url untuk mengambil semua data log_penggunaan
  const URL = `${BASE_API}/log_penggunaan/getAllData`;
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
      // mengembalikan data log_penggunaan
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

// fungsi untuk mengambil data log_penggunaan berdasarkan id
export const getlog_penggunaanById = async (id) => {
  // url untuk mengambil data log_penggunaan berdasarkan id
  const URL = `${BASE_API}/log_penggunaan/getById/${id}`;
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
      // mengembalikan data log_penggunaan
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

// fungsi untuk mengambil data log_penggunaan berdasarkan nama
export const searchlog_penggunaan = async (value) => {
  // url untuk mengambil data log_penggunaan berdasarkan nama
  const URL = `${BASE_API}/log_penggunaan/search/${value}`;
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
      // mengembalikan data log_penggunaan
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

// fungsi untuk mengambil data log_penggunaan
export const addlog_penggunaan  = async (values) => {
  // url untuk menambahkan data log_penggunaan
  const URL = `${BASE_API}/log_penggunaan/create`;
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
        message: "Berhasil mengajukan permohonan",
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

// fungsi untuk mengambil data log_penggunaan berdasarkan id
export const updateLog_penggunaan = async ({ values, id }) => {
  // url untuk mengubah data log_penggunaan berdasarkan id
  const URL = `${BASE_API}/log_penggunaan/edit/${id}`;
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
      // mengembalikan data log_penggunaan
      return Promise.resolve({
        status: "success",
        message: "Berhasil mengubah log_penggunaan",
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

// fungsi untuk mengambil data log_penggunaan berdasarkan id
export const updateLog_penggunaanByAcc = async ({ values, id }) => {
  // url untuk mengubah data log_penggunaan berdasarkan id
  const URL = `${BASE_API}/log_penggunaan/acc/${id}`;
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
      // mengembalikan data log_penggunaan
      return Promise.resolve({
        status: "success",
        message: "Berhasil mengubah status",
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

// fungsi untuk mengambil data log_penggunaan berdasarkan id
export const updateLog_penggunaanByKet = async ({ values, id }) => {
  // url untuk mengubah data log_penggunaan berdasarkan id
  const URL = `${BASE_API}/log_penggunaan/tolak/`;
  const updateData = {id,keterangan:values}
  console.log("f",updateData)
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.put(URL, updateData, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data log_penggunaan
      return Promise.resolve({
        status: "success",
        message: "Berhasil mengubah status",
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

// fungsi untuk mengambil data log_penggunaan berdasarkan id
export const updateLog_penggunaanByGo = async ({ values, id }) => {
  // url untuk mengubah data log_penggunaan berdasarkan id
  const URL = `${BASE_API}/log_penggunaan/go/${id}`;
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
      // mengembalikan data log_penggunaan
      return Promise.resolve({
        status: "success",
        message: "Berhasil mengubah status",
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

// fungsi untuk menghapus data log_penggunaan berdasarkan id
export const deleteLog_penggunaan = async (id) => {
  // url untuk menghapus data log_penggunaan berdasarkan id
  const URL = `${BASE_API}/log_penggunaan/delete/${id}`;
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
      // mengembalikan data log_penggunaan
      return Promise.resolve({
        status: "success",
        message: "Berhasil menghapus log_penggunaan",
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