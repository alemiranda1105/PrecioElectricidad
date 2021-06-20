import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import HourContainer from '../components/HourContainer';
import './Home.css';

const Home: React.FC = () => {
  const date = new Date();
  const day = date.toLocaleString('es-es', {weekday: 'long'});
  const hour = date.getHours();
  const min = date.getMinutes();

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
