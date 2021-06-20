import { IonText } from "@ionic/react";
import './tarifas.css';

interface ValleWeekend {
    day: string;
}

const ValleWeekend: React.FC<ValleWeekend> = ({day}) => {
    return (
        <div className="ion-text-center" id="dayContainer">
            <IonText>
                <p id="day">Hoy es {day}</p>
                <p id="dayText">Tarifa valle</p>
                <p id="dayText">La más barata</p>
            </IonText>
        </div>
    );
}

export default ValleWeekend;