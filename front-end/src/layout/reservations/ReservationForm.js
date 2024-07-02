import { useHistory } from "react-router-dom";
import React from "react";
import ErrorAlert from "../ErrorAlert";

//This function displays a form for the user to create or edit reservations

export default function ReservationForm({ submitHandler, reservation, setReservation, error }){

    const handleChange = ({ target }) => {
        setReservation({
        ...reservation,
        [target.name]: target.value,
        });
    };

    const history = useHistory();
    const cancelClickHandler = () => history.goBack();

  return (
    <React.Fragment>
      {error && <ErrorAlert error={error} />}
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="first_name">First Name</label>
        </div>
        <div>
          <input
            name="first_name"
            type="text"
            id="first_name"
            required
            value={reservation.first_name}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          ></input>
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
        </div>
        <div>
          <input
            name="last_name"
            type="text"
            id="last_name"
            required
            value={reservation.last_name}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          ></input>
        </div>
        <div>
          <label htmlFor="mobile_number">Mobile Number</label>
        </div>
        <div>
          <input
            name="mobile_number"
            type="tel"
            id="mobile_number"
            placeholder="XXX-XXX-XXXX"
            required
            value={reservation.mobile_number}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          ></input>
        </div>
        <div>
          <label htmlFor="people">Party Size</label>
        </div>
        <div>
          <input
            name="people"
            type="number"
            id="people"
            required
            min="1"
            value={reservation.people}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          ></input>
        </div>
        <div>
          <label htmlFor="reservation_date">Date</label>
        </div>
        <div>
          <input
            name="reservation_date"
            type="date"
            id="reservation_date"
            required
            value={reservation.reservation_date}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          ></input>
        </div>
        <div>
          <label htmlFor="reservation_time">Time</label>
        </div>
        <div>
          <input
            name="reservation_time"
            type="time"
            id="reservation_time"
            required
            value={reservation.reservation_time}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          ></input>
        </div>
        <hr></hr>
        <div>
          <button type="submit" className="btn btn-dark mx-1">Submit</button>
          <button type="button"onClick={cancelClickHandler} className="btn btn-dark mx-1">Cancel</button>
        </div>
      </form>
    </React.Fragment>
  );
}