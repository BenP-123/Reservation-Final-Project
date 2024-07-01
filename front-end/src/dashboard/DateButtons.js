import { previous, today, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";

export default function DateButtons({ date }){
    const history = useHistory();

    return(
        <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-dark mx-1"
                onClick={() => {
                    const prevDate = previous(date);
                    history.push(`/dashboard?date=${prevDate}`);
                }}
            >Previous Day</button>
            <button type="button" className="btn btn-dark mx-1"
                onClick={() => {
                    history.push(`/dashboard?date=${today()}`);
                }}
            >Today</button>
            <button type="button" className="btn btn-dark mx-1"
                onClick={() => {
                    const nextDate = next(date);
                    history.push(`/dashboard?date=${nextDate}`);
                }}
            >Next Day</button>
        </div>
    );
}