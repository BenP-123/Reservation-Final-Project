import PrintTable from "./PrintTable";

export default function CreateTablesList({ tables = [] }){
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Capacity
                        </th>
                        <th>
                            Table ID
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {!tables && "No open tables."}
                    {tables.map((table) => (
                        <PrintTable key={table.table_id} table={table} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}