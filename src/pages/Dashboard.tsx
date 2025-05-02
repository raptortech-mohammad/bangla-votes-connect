
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";

const Dashboard = () => {
  return (
    <MainLayout title="Dashboard">
      <DashboardOverview />
    </MainLayout>
  );
};

export default Dashboard;
