import PrintTable from "./PrintTable";
import "./tables.css";

export default function CreateTablesList({ tables = [] }){
    const tablesList = tables.map((table) => (
        <PrintTable key={table.table_id} table={table} />
    ));

    return tables ? (
        <div className="grid-wrapper grid-square">{tablesList}</div>
    ) : (<p>No open tables.</p>);
}