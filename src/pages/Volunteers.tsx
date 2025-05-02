
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import VolunteersList from "@/components/Volunteers/VolunteersList";

const Volunteers = () => {
  return (
    <MainLayout title="Volunteers">
      <VolunteersList />
    </MainLayout>
  );
};

export default Volunteers;
