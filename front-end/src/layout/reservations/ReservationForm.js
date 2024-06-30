import { useHistory } from "react-router-dom";
import React from "react";
import ErrorAlert from "../ErrorAlert";

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
          <label htmlFor="first_name">First Name:</label>
          <input
            name="first_name"
            type="text"
            id="first_name"
            required
            value={reservation.first_name}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            name="last_name"
            type="text"
            id="last_name"
            required
            value={reservation.last_name}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="mobile_number">Mobile Number:</label>
          <input
            name="mobile_number"
            type="tel"
            id="mobile_number"
            placeholder="XXX-XXX-XXXX"
            required
            value={reservation.mobile_number}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="people">Party Size:</label>
          <input
            name="people"
            type="number"
            id="people"
            required
            min="1"
            value={reservation.people}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="reservation_date">Date:</label>
          <input
            name="reservation_date"
            type="date"
            id="reservation_date"
            required
            value={reservation.reservation_date}
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time">Time:</label>
          <input
            name="reservation_time"
            type="time"
            id="reservation_time"
            required
            value={reservation.reservation_time}
            onChange={handleChange}
          ></input>
        </div>
        <hr></hr>
        <div>
          <button type="submit">Submit</button>
          <button type="button"onClick={cancelClickHandler}>Cancel</button>
        </div>
      </form>
    </React.Fragment>
  );
}