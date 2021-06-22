import { IonSpinner, IonText } from '@ionic/react';
import { Component } from 'react';
import './PriceVisualizer.css';

function getData() {
    const headersDict = {
        'Accept': 'application/json; application/vnd.esios-api-v2+json',
        'Content-Type': 'application/json',
        'Host': 'api.esios.ree.es',
        'Authorization': 'Token token=\"1137b6e6ef7fe4cbc99876e9810753817a5770c72acc3e4842e4905366b2dce6\"'
    };

    const options = {
        headers: new Headers(headersDict),
    };

    // url de la API
    const url = 'https://api.esios.ree.es/indicators/1001';

    // geoid de canarias
    const geoid = 8742;

    return fetch(url, options)
    .then(res =>{
        return res.json();
    })
    .then(res => {
        const data = res.indicator.values;
        // filtramos los valores para que sean los de nuestro geoid
        const datageo = data.filter((item: { [x: string]: number; }) => item['geo_id'] == geoid);
        
        // obtenemos los precios
        var precios: Number[] = [];
        var min = 100000000000000.0;
        var minInd = 0;
        var max = 0.0;
        var maxInd = 0;
        var prom = 0.0;
        
        for(var i = 0; i < datageo.length; i++) {
            const val = datageo[i].value;
            if(val < min) {
                min = val;
                minInd = i;
            }
            if(val > max) {
                max = val;
                maxInd = i;
            }
            prom += val;
            precios.push(val)
        }
        prom = prom / datageo.length;

        return([max/1000, min/1000, prom/1000]);
    });
}

type PriceProps = {};
type PriceState = {
    isLoading: boolean,
    max: number,
    min: number,
    prom: number
};
class Price extends Component<PriceProps, PriceState> {
    constructor(props: PriceProps) {
        super(props);
        this.state = {
            isLoading: false,
            max: 0.0,
            min: 0.0,
            prom: 0.0,
        };

    }
    componentDidMount() {
        this.setState({ isLoading: true })
        getData().then(data => this.setState({ isLoading: false, max: data[0], min: data[1], prom: data[2] }))
    }
    render() {
        const {isLoading, max, min, prom} = this.state;
        if(isLoading) {
            return (
                <div id="priceContainer">
                    <IonSpinner name="dots" />
                </div>
            );
        }
        return (
            <div id="priceContainer">
                <IonText>
                    <h1 id="priceTitle">Precios de hoy: </h1>
                    <p id="priceDesc">Máximo</p>
                    <p id="price">{max}€/kWh</p>
                    <p id="priceDesc">Mínimo</p>
                    <p id="price">{min}€/kWh</p>
                    <p id="priceDesc">Promedio</p>
                    <p id="price">{Math.round((prom + Number.EPSILON) * 100000)/100000}€/kWh</p>
                </IonText>
            </div>
        );
    }
}

const PriceVisualizer = () => {   
    return (
        <div>
            <Price />
        </div>
    );
};

export default PriceVisualizer;