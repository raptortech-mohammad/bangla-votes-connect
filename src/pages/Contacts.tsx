
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import ContactsList from "@/components/Contacts/ContactsList";

const Contacts = () => {
  return (
    <MainLayout title="Contacts">
      <ContactsList />
    </MainLayout>
  );
};

export default Contacts;
