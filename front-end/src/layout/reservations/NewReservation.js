import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../utils/api";
import { formatAsDate, formatAsTime } from "../../utils/date-time";
import ReservationForm from "./ReservationForm";

//This function displays a form for the user to create a new reservation, 
//and sends the new reservation to the back end

export default function NewReservation() {
  const history = useHistory();
  const [error, setError] = useState("");

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  });

  async function submitHandler(event) {
    const abortController = new AbortController();
    event.preventDefault();
    
    const formattedDate = formatAsDate(reservation.reservation_date);
    const formattedTime = formatAsTime(reservation.reservation_time);
    const newReservation = {
      ...reservation,
      reservation_date: formattedDate,
      reservation_time: formattedTime,
      people: Number(reservation.people), 
    };

    try {
      await createReservation(newReservation, abortController.signal);
    }
    catch(error){
      setError(error);
      return;
    }

    history.push(`/dashboard?date=${formattedDate}`);
    return () => abortController.abort();
  }

  return (
    <div>
      <h1>New Reservation</h1>
      <br></br>
      <ReservationForm
        submitHandler={submitHandler}
        reservation={reservation}
        setReservation={setReservation}
        error={error}
      />
    </div>
  );
}