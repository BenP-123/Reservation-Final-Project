import PrintReservation from "./PrintReservation";

export default function CreateReservationsList({ reservations = [] }){
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Reservation ID</th>
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Party Size</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <PrintReservation reservation={reservation} key={reservation.reservation_id}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}