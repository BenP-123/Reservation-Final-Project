import React, { useState, useEffect } from 'react';

export const ReservationForm = ({addReservation}) => {

      const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time: '',
        people: 1,
      });

    const handleChange = ({ target }) => {
        setFormData({
        ...formData,
        [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        addReservation(formData);
      };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="first_name">First name:</label>
            <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
            />

            <label htmlFor="last_name">Last name:</label>
            <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
            />

            <label htmlFor="mobile_number">Mobile number:</label>
            <input
                type="tel"
                id="mobile_number"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                required
            />

            <label htmlFor="reservation_date">Date of reservation:</label>
            <input
                type="date"
                id="reservation_date"
                name="reservation_date"
                value={formData.reservation_date}
                onChange={handleChange}
                required
            />

            <label htmlFor="reservation_time">Time of reservation:</label>
            <input
                type="time"
                id="reservation_time"
                name="reservation_time"
                value={formData.reservation_time}
                onChange={handleChange}
                required
            />

            <label htmlFor="people">Number of people in the party (minimum 1):</label>
            <input
                type="number"
                id="people"
                name="people"
                min="1"
                value={formData.people}
                onChange={handleChange}
                required
            />

            <br />

            <button type="button" onClick={window.history.back}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ReservationForm;