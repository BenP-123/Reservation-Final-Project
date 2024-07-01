import ClearTable from "./ClearTable";
import "./tables.css";

export default function PrintTable({ table }){
    const { table_name, capacity, table_id, reservation_id } = table;

    return(
        <div className="table card table-square">
            <div className="card-body text-center">
                <h4 className="card-title">{table_name}</h4>
                <div className="card-subtitle my-2">
                    <p data-table-id-status={table_id}>{reservation_id ? "Occupied" : "Free"}</p>
                </div>
                <p>Capacity: {capacity}</p>
                <div>{reservation_id && <ClearTable table_id={table_id} />}</div>
            </div>
        </div>
    );
}
