import React from "react";
import Container from "Components/Container/Container";
import EditProfileForm from "./Components/EditProfileForm";
import ChangePasswordForm from "./Components/ChangePasswordForm";
const EditAccounts = () => {
  return (
    <section className="py-secondary">
      <Container>
        <div className="flex flex-col lg:flex-row gap-y-16">
          <EditProfileForm />
          <ChangePasswordForm />
        </div>
      </Container>
    </section>
  );
};

export default EditAccounts;
