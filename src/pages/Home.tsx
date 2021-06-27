import { IonCol, IonContent, IonGrid, IonHeader, IonToolbar, IonPage, IonRow, IonTitle } from '@ionic/react';
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
        <IonHeader>
          <IonToolbar>
            <IonTitle>Precio de hoy ⚡</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color={color}>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Precio de hoy ⚡</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonGrid>
            <IonRow>
              <IonCol>
                <HourContainer />
              </IonCol>
            </IonRow>
            <IonRow class="ion-align-items-center">
              <IonCol sizeLg="6" sizeMd="12" sizeSm="12" sizeXs="12" size="12">
                <ValleWeekend day={day}/>
              </IonCol>
              <IonCol sizeLg="6" sizeMd="12" sizeSm="12" sizeXs="12" size="12">
                <PriceVisualizer />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  } else if(isPunta(hour)) {
    color = "danger";
    description = "La más cara";
    tarifa = "punta ⛔";
    if(hour >= 10 && hour < 14) {
      start = "10:00";
      end = "14:00";
    } else {
      start = "18:00";
      end = "22:00";
    }
  } else if(isLlana(hour)) {
    color = "warning";
    description = "Ni la más cara ni la más barata";
    tarifa = "llana ⚠️";
    if(hour >= 8 && hour < 11) {
      start = "08:00";
      end = "10:00";
    } else if(hour >= 14 && hour < 18) {
      start = "14:00";
      end = "18:00";
    } else {
      start = "22:00"
      end = "00:00";
    }
  } else {
    description = "La más barata";
    color = "success";
    tarifa = "valle ✅";
    start = "00:00";
    end = "08:00";
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Precio de hoy ⚡</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color={color}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Precio de hoy ⚡</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <HourContainer />
            </IonCol>
          </IonRow>
          <IonRow class="ion-align-items-center">
            <IonCol sizeLg="6" sizeMd="12" sizeSm="12" sizeXs="12" size="12">
              <TarifaContainer start={start} end={end} tarifa={tarifa} description={description}/>
            </IonCol>
            <IonCol sizeLg="6" sizeMd="12" sizeSm="12" sizeXs="12" size="12">
              <PriceVisualizer />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
