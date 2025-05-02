
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import ContactDetail from "@/components/Contacts/ContactDetail";

const ContactDetailPage = () => {
  return (
    <MainLayout title="Contact Details">
      <ContactDetail />
    </MainLayout>
  );
};

export default ContactDetailPage;
