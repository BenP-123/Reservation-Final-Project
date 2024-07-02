import { useHistory } from "react-router-dom";
import { updateReservationStatus } from "../../utils/api";

//This function generates a cancel button for reservations, and sets status
//of reservation to "cancelled" when it is clicked

export default function CancelReservation({ reservation }){
    const history = useHistory();
    const { reservation_date, reservation_id } = reservation;

    async function handleCancel(){
        const abortController = new AbortController();

        if(window.confirm("Do you want to cancel this reservation? This cannot be undone.")){
            const cancelledReservation = {...reservation, status: "cancelled"};
            try{
                await updateReservationStatus(cancelledReservation, abortController.signal);
            }
            catch(error){
                console.log(error);
            }
            window.location.reload();
        }
        else{
            history.push(`dashboard?date=${reservation_date}`);
        }

        return abortController.abort();
    }

    return(
        <button 
            type="button" 
            data-reservation-id-cancel={reservation_id}
            className="btn btn-primary mx-2"
            onClick={() => handleCancel()}
        >Cancel</button>
    );
}