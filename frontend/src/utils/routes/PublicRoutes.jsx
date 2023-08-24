// import library yang dibutuhkan
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorage } from "../helper/localStorage";
import { LOCAL_STORAGE_USER } from "../constants";

// buat komponen ProtectedRoutes
const userAuth = () => {
  // ambil user dari local storage
  const user = getLocalStorage(LOCAL_STORAGE_USER);
  // jika user ada maka kembalikan role dan auth
  if (user) {
    return {
      role: user.role,
      auth: true,
    };
  }
  // jika tidak ada maka kembalikan false
  else {
    return {
      role: null,
      auth: false,
    };
  }
};

// buat komponen ProtectedRoutes
export default function PublicRoutes() {
  // ambil token dan role dari fungsi userAuth
  const { auth, role } = userAuth();
  return (
    <>
      {/* 
        jika auth true dan role admin maka kembalikan ke halaman dashboard admin
      */}
      {auth ? (
        role === "admin" ? (
          <Navigate to="/dashboard/admin/" />
        ) : // jika auth true dan role user maka kembalikan ke halaman dashboard user
        role === "user" ? (
          <Navigate to="/dashboard/user/" />
        ) : (
          // jika auth true dan role validator maka kembalikan ke halaman dashboard validator
          <Navigate to="/dashboard/validator/" />
        )
      ) : (
        // jika auth false maka kembalikan ke halaman login
        <Outlet />
      )}
    </>
  );
}
