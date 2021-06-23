import { IonText } from "@ionic/react";
import { Component } from "react";
import './HourContainer.css';

/*interface HourProps {
    hour: string;
}*/

type HourProps = {};
type HourState = {
    hour: number;
    min: number;
};

class Hour extends Component<HourProps, HourState> {
    interval: NodeJS.Timeout;
    constructor(props: HourProps) {
        super(props)
        const date = new Date();
        this.state = {
            hour: date.getHours(),
            min: date.getMinutes()
        };
        this.interval = setInterval(() => this.setState({
            hour: new Date().getHours(),
            min: new Date().getMinutes()
        }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {hour, min} = this.state;
        return (
            <div>
                <IonText id="hour">{hour + ":" + (min < 10? "0" + min: min)}</IonText>
            </div>
        );
    }
}

const HourContainer = () => {
    return (
        <div className="ion-text-center" id="hourContainer">
            <Hour/>
        </div>
    );
}

export default HourContainer;