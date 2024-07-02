import PrintTable from "./PrintTable";
import "./tables.css";

//This function generates a list of all tables, or 
//"No tables" if there are no tables

export default function CreateTablesList({ tables = [] }){
    const tablesList = tables.map((table) => (
        <PrintTable key={table.table_id} table={table} />
    ));

    return tables.length>0 ? (
        <div className="grid-wrapper grid-square">{tablesList}</div>
    ) : (<p>No tables.</p>);
}