import { isNullableTypeAnnotation } from '@babel/types';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import HourContainer from '../components/HourContainer';
import ValleWeekend from '../components/tarifas/ValleWeekend';
import TarifaContainer from '../components/tarifas/TarifaContainer';
import PriceVisualizer from '../components/PriceVisualizer';
import './Home.css';

function isPunta(hour: number) {
  return (
    (hour >= 10 && hour < 14) || (hour >= 18 && hour < 22)
  );
}

function isLlana(hour: number) {
  return (
    (hour >= 8 && hour < 10) || (hour >= 14 && hour < 18) || (hour >= 22 && hour <= 23)
  );
}

const Home: React.FC = () => {
  const date = new Date();
  const day = date.toLocaleString('es-es', {weekday: 'long'});
  const hour = date.getHours();

  const min = date.getMinutes();

  // color de fondo
  var color = "";
  // hora de inicio y final del horario
  var end = "";
  var start = "";
  // descripcion tarifa
  var tarifa = "";
  var description = "";

  if(day === "sábado" || day === "domingo") {
    console.log("fin de semana");
    color = "success";
    return (
      <IonPage>
        <IonContent fullscreen color={color}>
          <HourContainer hour={hour + ":" + (min < 10? ("0" + min): min)} />
          <ValleWeekend day={day}/>
        </IonContent>
      </IonPage>
    );
  } else if(isPunta(hour)) {
    color = "danger";
    description = "La más cara";
    tarifa = "punta";
    if(hour >= 10) {
      start = "10:00";
      end = "14:00";
    } else {
      start = "18:00";
      end = "22:00";
    }
  } else if(isLlana(hour)) {
    color = "warning";
    description = "Ni la más cara ni la más barata";
    tarifa = "llana";
    if(hour >= 8) {
      start = "08:00";
      end = "10:00";
    } else if(hour >= 14) {
      start = "14:00";
      end = "18:00";
    } else {
      start = "22:00"
      end = "00:00";
    }
  } else {
    description = "La más barata";
    color = "success";
    tarifa = "valle";
    start = "00:00";
    end = "08:00";
  }

  return (
    <IonPage>
      <IonContent fullscreen color={color} className="ion-text-center">
        <HourContainer hour={hour + ":" + (min < 10? ("0" + min): min)} />
        <TarifaContainer start={start} end={end} tarifa={tarifa} description={description}/>
        <PriceVisualizer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
