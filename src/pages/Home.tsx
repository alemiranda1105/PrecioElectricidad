import { isNullableTypeAnnotation } from '@babel/types';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import HourContainer from '../components/HourContainer';
import ValleWeekend from '../components/tarifas/ValleWeekend';
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

  if(day === "sábado" || day === "domingo") {
    console.log("fin de semana");
    let color = "success";
    return (
      <IonPage>
        <IonContent fullscreen color={color}>
          <HourContainer hour={hour + ":" + (min < 10? ("0" + min): min)} />
          <ValleWeekend day={day}/>
        </IonContent>
      </IonPage>
    );
  } else if(isPunta(hour)) {

  } else if(isLlana(hour)) {

  } else {

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Precio Electricidad</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Precio Electricidad</IonTitle>
          </IonToolbar>
        </IonHeader>
        <HourContainer hour={hour + ":" + (min < 10? ("0" + min): min)} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
