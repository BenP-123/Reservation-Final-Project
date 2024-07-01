import { previous, today, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";

export default function DateButtons({ date }){
    const history = useHistory();

    return(
        <div>
            <button type="button" 
                onClick={() => {
                    const prevDate = previous(date);
                    history.push(`/dashboard?date=${prevDate}`);
                }}
            >Previous Day</button>
            <button type="button" 
                onClick={() => {
                    history.push(`/dashboard?date=${today()}`);
                }}
            >Today</button>
            <button type="button" 
                onClick={() => {
                    const nextDate = next(date);
                    history.push(`/dashboard?date=${nextDate}`);
                }}
            >Next Day</button>
        </div>
    );
}