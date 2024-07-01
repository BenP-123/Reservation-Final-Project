import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from '../utils/useQuery.js';

import DateButtons from "./DateButtons";
import CreateReservationsList from "../layout/reservations/CreateReservationsList.js";
import CreateTablesList from "../layout/tables/CreateTablesList.js";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  const query = useQuery();
  const queryDate = query.get("date");

  if(queryDate){
    date = queryDate;
  }

  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservations(){
      setReservationsError(null);
      try{
        const data = await listReservations({ date }, abortController.signal);
        setReservations(data);
      }
      catch(error){
        setReservationsError(error);
      }
    }
    loadReservations();
    return () => abortController.abort();
  }, [date]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTables(){
      setTablesError(null);
      try{
        const data = await listTables(abortController.signal);
        setTables(data);
      }
      catch(error){
        setTablesError(error);
      }
    }
    loadTables();
    return () => abortController.abort();
  }, []);

  const filterReservations = reservations.filter((reservation) => 
    reservation.status !== "finished"
  );

  return (
    <main>
      <h1 className="my-2 text-center">Dashboard</h1>
      <DateButtons date={date}/>
      <h4 className="mb-0 text-center">{date}</h4>

      <div className="d-md-flex mb-3">
      </div>
      
      <h4>Reservations:</h4>
      <CreateReservationsList reservations={filterReservations}/>
      <ErrorAlert error={reservationsError} />
      <br></br>
      <div>
        <h4>Tables:</h4>
        <CreateTablesList tables={tables} />
        <ErrorAlert error={tablesError} />
      </div>
    </main>
  );
}

export default Dashboard;
