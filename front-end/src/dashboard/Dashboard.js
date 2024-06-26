import React, { useEffect, useState } from "react";
import { useParams, Redirect, useLocation } from 'react-router-dom';
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationDate from '../utils/format-reservation-date';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const { date } = useParams();
  const location = useLocation();

  useEffect(loadDashboard, [date, location]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    let selectedDate = date ? new Date(date) : new Date();
    listReservations(selectedDate.toISOString().split('T')[0], abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleNext = () => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const formattedNextDate = formatReservationDate(nextDate);
    Redirect(`/dashboard?date=${formattedNextDate.reservation_date}`);
  };

  const handlePrevious = () => {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const formattedPrevDate = formatReservationDate(prevDate);
    Redirect(`/dashboard?date=${formattedPrevDate.reservation_date}`);
  };

  const handleToday = () => {
    Redirect('/dashboard');
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleToday}>Today</button>
      <button onClick={handleNext}>Next</button>
      <br></br>
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
