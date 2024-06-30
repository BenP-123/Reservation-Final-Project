import ClearTable from "./ClearTable";

export default function PrintTable({ table }){
    const { table_name, capacity, table_id, reservation_id } = table;

    return(
        <tr>
            <td>{table_name}</td>
            <td>{capacity}</td>
            <td>{table_id}</td>
            <td data-table-id-status={table_id}>{reservation_id ? "Occupied" : "Free"}</td>
            <td>{reservation_id && <ClearTable table_id={table_id} />}</td>
        </tr>
    );
}