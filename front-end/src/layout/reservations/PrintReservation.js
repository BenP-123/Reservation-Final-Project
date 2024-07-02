import CancelReservation from "./CancelReservation";

//This function displays individual reservations, along with any relevant action buttons

export default function PrintReservation({ reservation }){
    const {
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
        reservation_id,
        status,
    } = reservation;

    let options = <></>;

    if(status === "booked"){
        options = 
            <>
                <td>
                    <a href={`/reservations/${reservation_id}/seat`} className="btn btn-primary mx-2">Seat</a>
                    <a href={`/reservations/${reservation_id}/edit`} className="btn btn-primary mx-2">Edit</a>
                    <CancelReservation reservation={reservation} />
                </td>
            </>
    }

    return(
        <tr>
            <td className="align-middle text-center">{reservation_id}</td>
            <td className="align-middle text-center">{first_name} {last_name}</td>
            <td className="align-middle text-center">{mobile_number}</td>
            <td className="align-middle text-center">{reservation_date}</td>
            <td className="align-middle text-center">{reservation_time}</td>
            <td className="align-middle text-center">{people}</td>
            <td className="align-middle text-center" data-reservation-id-status={reservation.reservation_id}>{status}</td>
            <>{options}</>
        </tr>
    );
}