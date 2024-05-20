import { onGetAllBookingsForCurrentUser } from "@/actions/appointment";
import { AllAppointments } from "@/components/appointment/all-appointments";
import { NavBar } from "@/components/navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const AppointmentsPage = async () => {
  const user = await currentUser();

  if (!user) return null;
  const domainBookings = await onGetAllBookingsForCurrentUser(user.id);
  const today = new Date();
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 h-0 gap-5">
        <div className="lg:col-span-2 overflow-y-auto">
          <AllAppointments bookings={domainBookings?.bookings} />
        </div>
        <div className="col-span-1">
          {domainBookings &&
            domainBookings.bookings.map((booking) =>
              booking.date.getTime() === today.getTime() ? (
                <Card key={booking.id} className="rounded-xl overflow-hidden">
                  <CardContent className="p-0 flex">
                    <div className="w-4/12 text-xl bg-peach py-10 flex justify-center items-center font-bold">
                      {booking.slot}
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between w-full p-3">
                        <p className="text-sm">
                          created
                          <br />
                          {booking.createdAt.getHours()}{" "}
                          {booking.createdAt.getMinutes()}{" "}
                          {booking.createdAt.getHours() > 12 ? "PM" : "AM"}
                        </p>
                        <p className="text-sm">
                          Domain <br />
                          {booking.Customer?.Domain?.name}
                        </p>
                      </div>
                      <Separator orientation="horizontal" />
                      <div className="w-full flex items-center p-3 gap-2">
                        <Avatar>
                          <AvatarFallback>{booking.email[0]}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm">{booking.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div key={booking.id} className="w-full flex justify-center">
                  <p>No Appointments Today</p>
                </div>
              )
            )}
        </div>
      </div>
    </>
  );
};

export default AppointmentsPage;
