// import library yang dibutuhkan
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import PublicRoutes from "./utils/routes/PublicRoutes";
import ProtectedRoutes from "./utils/routes/ProtectedRoutes";
import Layout from "./components/layout/Layout";
import {
  Login,
  AdminDashboard,
  AdminUser,
  AdminKendaraan,
  AdminRiwayat_service,
  AdminLog_penggunaan,
  UserDashboard,
  UserKendaraan,
  UserLog_penggunaan,
  ValidatorDashboard,
  ValidatorLog_penggunaan,
} from "./pages";

// buat rute
const router = createBrowserRouter(
  // buat rute dari element
  createRoutesFromElements(
    <>
      {/* rute utama */}
      <Route path="/" element={<ProtectedRoutes />}>
        {/* auto redirect ke halaman login */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* rute untuk role admin */}
        <Route path="/dashboard/admin" element={<Layout />}>
          {/* rute dashboard */}
          <Route index element={<AdminDashboard />} />
          {/* rute user */}
          <Route path="user" element={<AdminUser />} />
          {/* rute kendaraan */}
          <Route path="kendaraan" element={<AdminKendaraan />} />
          {/* rute riwayat_service */}
          <Route path="service" element={<AdminRiwayat_service />} />
          {/* rute log_penggunaan */}
          <Route path="penggunaan" element={<AdminLog_penggunaan />} />
        </Route>
        {/* rute untuk role user */}
        <Route path="/dashboard/user" element={<Layout />}>
          {/* rute dashboard */}
          <Route index element={<UserDashboard />} />
          {/* rute kendaraan */}
          <Route path="kendaraan" element={<UserKendaraan />} />
          {/* rute log_penggunaan */}
          <Route path="penggunaan" element={<UserLog_penggunaan />} />
        </Route>
        {/* rute untuk role validator */}
        <Route path="/dashboard/validator" element={<Layout />}>
          {/* rute dashboard */}
          <Route index element={<ValidatorDashboard />} />
          {/* rute log_penggunaan */}
          <Route path="penggunaan" element={<ValidatorLog_penggunaan />} />
        </Route>
      </Route>
      {/* rute login */}
      <Route path="login" element={<PublicRoutes />}>
        {/* halaman login */}
        <Route index element={<Login />} />
      </Route>
    </>
  )
);

// buat komponen utama
export default function App() {
  /* berikan router ke provider */
  return <RouterProvider router={router} />;
}
