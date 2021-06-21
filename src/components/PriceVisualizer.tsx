import { IonContent, IonPage, IonText } from '@ionic/react';
import { Component } from 'react';

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
        //console.log("maximo = " + max/1000);
        //console.log("minimo = " + min/1000);
        //console.log("promedio = " + prom/1000);

        return([max/1000, min/1000, prom/1000]);
    });
}

type PriceProps = {};
type PriceState = {
    isLoading: boolean,
    max: Number,
    min: Number,
    prom: Number
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
            return <p>Loading...</p>;
        }
        return (
            <div>
                <p>Máximo: {max}</p>
                <p>Mínimo: {min}</p>
                <p>Promedio: {prom}</p>
            </div>
        );
    }
}

const PriceVisualizer = () => {   
    var data;
    getData().then(response => data = response);
    console.log(data);
    
    return (
        <div>
            <Price/>
        </div>
    );
};

export default PriceVisualizer;