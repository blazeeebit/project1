import {
  onDomainCustomerResponses,
  onGetAllDomainBookings,
} from "@/actions/appointment";
import { PortalForm } from "@/components/forms/portal/portal-form";
import React from "react";

const CustomerSignUpForm = async ({
  params,
}: {
  params: { domainid: string; customerid: string };
}) => {
  const questions = await onDomainCustomerResponses(params.customerid);
  const bookings = await onGetAllDomainBookings(params.domainid);

  if (!questions) return null;

  return (
    <PortalForm
      bookings={bookings}
      email={questions.email!}
      domainid={params.domainid}
      customerId={params.customerid}
      questions={questions.questions}
      type="Appointment"
    />
  );
};

export default CustomerSignUpForm;
