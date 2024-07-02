import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../../utils/api";
import { formatAsDate, formatAsTime } from "../../utils/date-time";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../ErrorAlert";

//This function allows the user to edit existing reservations, changes are
//then reflected in the database

export default function EditReservation(){
    const history = useHistory();
    const { reservation_id } = useParams();

    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
        reservation_id: reservation_id,
      });
  
    const [error, setError] = useState("");

    useEffect(() => {
        const abortController = new AbortController();

        async function loadReservation(){
            try {
                const data = await readReservation(reservation_id, abortController.signal);
                const formattedTime = formatAsTime(data.reservation_time);
                const formattedDate = formatAsDate(data.reservation_date);
                setReservation(previousReservation => ({
                    ...previousReservation,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    mobile_number: data.mobile_number,
                    reservation_date: formattedDate,
                    reservation_time: formattedTime,
                    people: data.people,
                    status: data.status,
                  }));
            } 
            catch(error){
                return <ErrorAlert error={error} />;
            }
        }
        loadReservation();
        return () => abortController.abort();
    }, [reservation_id]);

  async function submitHandler(event){
    const abortController = new AbortController();
    event.preventDefault();
    const updatedReservation = {...reservation, people: Number(reservation.people)};

    try {
      await updateReservation(updatedReservation, abortController.signal);
    } 
    catch(error){
      setError(error);
      return;
    }
    const formattedDate = formatAsDate(reservation.reservation_date);
    history.push(`/dashboard?date=${formattedDate}`);
    return () => abortController.abort();
  }

  return (
    <div>
      <h1>Edit Reservation</h1>
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