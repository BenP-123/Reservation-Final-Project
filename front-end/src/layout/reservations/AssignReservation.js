import { readReservation, listTables, updateTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import React from "react";

export default function AssignReservation(){
    const history = useHistory();
    const { reservation_id } = useParams();

    const [tableId, setTableId] = useState(0);
    const [tables, setTables] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        async function loadTables(){
            const loadedTables = await listTables(abortController.signal);
            setTables(loadedTables);
        }
        loadTables();
        return () => abortController.abort();
    }, []);

    const openTables = tables.filter((table) => !table.reservation_id);

    async function submitHandler(event){
        const abortController = new AbortController();
        event.preventDefault();

        const updatedTable = {reservation_id: reservation_id, table_id: tableId};

        try{
            await updateTable(updatedTable, abortController.signal);
        }
        catch(error){
            setError(error);
            return;
        }
        history.push("/dashboard");
        return () => abortController.abort();
    };

    return(
        <React.Fragment>
            <h1>Select a table to seat the reservation at:</h1>
            {error && <ErrorAlert error={error} />}
            <form onSubmit={submitHandler}>
                <select name="table_id" onChange={(event) => setTableId(event.target.value)}>
                    {openTables.map((table) => (
                        <option key ={table.table_id} value={table.table_id}>
                            {table.table_name} - {table.capacity}
                        </option>
                    ))}
                </select>
                <hr></hr>
                <button type="submit">Submit</button>
            </form>
        </React.Fragment>
    );
}