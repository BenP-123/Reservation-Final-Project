import ErrorAlert from "../ErrorAlert";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";

//This function displays a form for the user to create new tables,
//then generates a new table upon form submission

export default function NewTable(){
    const [tableName, setTableName] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [error, setError] = useState(null);

    const history = useHistory();

    async function submitHandler(event){
        const abortController = new AbortController();
        event.preventDefault();

        const newTable = {table_name: tableName, capacity: Number(capacity)};


        try{
            await createTable(newTable, abortController.signal);
        }
        catch(error){
            setError(error);
            return;
        }
        history.push("/dashboard");
        return () => abortController.abort();
    }

    const tableNameHandler = (event) => setTableName(event.target.value);
    const capacityHandler = (event) => setCapacity(event.target.value);
    const cancelHandler = () => history.goBack();


    return(
        <div>
            <h1>Create New Table:</h1>
            {error && <ErrorAlert error={error} />}
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="table_name">Table Name</label>
                </div>
                <div>
                    <input
                        name="table_name"
                        type="text"
                        id="table_name"
                        required
                        onChange={tableNameHandler}
                    ></input>
                </div>
                <div>
                    <label
                        htmlFor="capacity">Capacity</label>
                </div>
                <div>
                    <input
                        name="capacity"
                        type="number"
                        id="capacity"
                        required
                        onChange={capacityHandler}
                    ></input>
                </div>
                <hr></hr>
                <div>
                    <button type="submit" className="btn btn-dark mx-1">Submit</button>
                    <button type="button" onClick={cancelHandler} className="btn btn-dark mx-1">Cancel</button>
                </div>
            </form>
        </div>
    );
}