import CancelReservation from "./CancelReservation";

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
                    <a href={`/reservations/${reservation_id}/seat`}>Seat</a>
                    <a href={`/reservations/${reservation_id}/edit`}>Edit</a>
                    <CancelReservation reservation={reservation} />
                </td>
            </>
    }

    return(
        <tr>
            <td>{reservation_id}</td>
            <td>{first_name} {last_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
            <td data-reservation-id-status={reservation.reservation_id}>{status}</td>
            <>{options}</>
        </tr>
    );
}