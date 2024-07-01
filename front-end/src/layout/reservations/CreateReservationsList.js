import PrintReservation from "./PrintReservation";

export default function CreateReservationsList({ reservations = [] }){
    return(
        <div className="table-responsive">
            {reservations.length > 0 ? (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" className="align-middle text-center">Reservation ID</th>
                        <th scope="col" className="align-middle text-center">Name</th>
                        <th scope="col" className="align-middle text-center">Mobile Number</th>
                        <th scope="col" className="align-middle text-center">Date</th>
                        <th scope="col" className="align-middle text-center">Time</th>
                        <th scope="col" className="align-middle text-center">Party Size</th>
                        <th scope="col" className="align-middle text-center">Status</th>
                        <th scope="col" className="align-middle text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <PrintReservation reservation={reservation} key={reservation.reservation_id}/>
                    ))}
                </tbody>
            </table>
            ) : (
                <h6>No reservations for selected date</h6>
              )}
        </div>
    );
}