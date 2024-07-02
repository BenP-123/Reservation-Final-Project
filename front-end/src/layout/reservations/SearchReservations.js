import { listReservations } from "../../utils/api";
import CreateReservationsList from "./CreateReservationsList";
import { useState } from "react";

//This function handles the searching and displaying of reservaitons by mobile number

export default function SearchReservations(){
    const [reservations, setReservations] = useState([]);
    const [mobileNumber, setMobileNumber] = useState("");

    async function submitHandler(event){
        const abortController = new AbortController();
        event.preventDefault();

        try{
            const reservationList = await listReservations({mobile_number: mobileNumber}, abortController.signal);
            setReservations(reservationList);
        }
        catch(error){
            console.log(error);
        }
        return () => abortController.abort();
    }

    const mobileNumberHandler = (event) => setMobileNumber(event.target.value);

    return(
        <div>
            <h1>Search Reservations by Mobile Number:</h1>
            <br></br>
            <form onSubmit={submitHandler}>
                <label htmlFor="mobile_number">Mobile Number:</label>
                <input 
                    name="mobile_number"
                    id="mobile_number"
                    required={true}
                    placeholder="XXX-XXX-XXXX"
                    type="text"
                    onChange={mobileNumberHandler}
                ></input>
                <button type="submit">Search</button>
            </form>
            {reservations.length > 0 ? (
                <div>
                    <h2>Reservations for {mobileNumber}</h2>
                    <CreateReservationsList reservations={reservations} />
                </div>
            ) : (
                <h3>No reservations found.</h3>
            )}
        </div>
    );
}