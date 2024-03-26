"use client";
import { useSelector } from "react-redux";
import DashboardAdmin from "./components/dashboardAdmin/DashboardAdmin";
import DashboardAuthor from "./components/dashboardAuthor/DashboardAuthor";

export default function DashboardPage() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      <h1 className="titlePageManagent">Dashboard</h1>
      {userInfo.role === "Admin" ? <DashboardAdmin /> : <DashboardAuthor />}
    </>
  );
}
