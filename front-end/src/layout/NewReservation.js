import React, {useState, useEffect} from "react";
import { useParams, Redirect} from "react-router-dom";
import {createReservation} from "../utils/api";
import ReservationForm from "./ReservationForm";

export const newReservation = () => {
 
  const addReservation = async (formData) => {
    const newReservation = {"first_name": formData.first_name, "last_name": formData.last_name, 
      "mobile_number": formData.mobile_number, "reservation_date": formData.reservation_date, 
      "reservation_time": formData.reservation_time, "people": formData.people};       
    await createReservation(newReservation);
    Redirect(`/dashboard?date=${formData.reservation_date}`);
  };
  

  return (
    <div>
      <h1>New Reservation:</h1>
      <ReservationForm addReservation={addReservation} />
    </div>
    
  );
}

export default newReservation;