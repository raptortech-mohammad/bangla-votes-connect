
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import CampaignsList from "@/components/Campaigns/CampaignsList";

const Campaigns = () => {
  return (
    <MainLayout title="Campaigns">
      <CampaignsList />
    </MainLayout>
  );
};

export default Campaigns;
