
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import ProfilesManager from "@/components/DataTools/Profiles/ProfilesManager";

const ProfilesPage = () => {
  return (
    <MainLayout title="Citizen & Supporter Profiles">
      <ProfilesManager />
    </MainLayout>
  );
};

export default ProfilesPage;
