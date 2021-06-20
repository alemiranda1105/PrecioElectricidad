import { IonText } from "@ionic/react";
import './tarifas.css';

interface TarifaProps {
    start: string;
    end: string;
    tarifa: string;
    description: string;
}

const TarifaContainer: React.FC<TarifaProps> = ({start, end, tarifa, description}) => {
    return (
        <div className="ion-text-center" id="dayContainer">
            <IonText>
                <p id="day">Tarifa {tarifa}</p>
                <p id="dayText">De {start} a {end}</p>
                <p id="dayText">{description}</p>
            </IonText>
        </div>
    );
}

export default TarifaContainer;