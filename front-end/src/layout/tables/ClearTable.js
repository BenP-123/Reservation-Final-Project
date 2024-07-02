import { useHistory } from "react-router-dom";
import { clearTableReservation } from "../../utils/api";

//This function allows the user to clear a table, updating table and reservation status 

export default function ClearTable({ table_id }){
    const history = useHistory();
    async function clickHandler(event){
        event.preventDefault();
        const abortController = new AbortController();
        
        const result = window.confirm("Is this table ready to seat new guests? This cannot be undone.");

        if(result){
            try{
                await clearTableReservation(table_id, abortController.signal);
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            history.push("/dashboard");
        }
        window.location.reload();
        return () => abortController.abort();
    }
    return (
        <button 
            type="button"
            data-table-id-finish={table_id}
            onClick={clickHandler}
        >Finish</button>
    );
}