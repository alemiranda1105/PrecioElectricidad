import { IonText } from "@ionic/react";
import './HourContainer.css';

interface HourProps {
    hour: string;
}

const HourContainer: React.FC<HourProps> = ({hour}) => {
    return (
        <div className="ion-text-center" id="hourContainer">
            <IonText id="hour">{hour}</IonText>
        </div>
    );
}

export default HourContainer;