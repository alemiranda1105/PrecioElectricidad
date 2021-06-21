
const PriceVisualizer = () => {
    const headersDict = {
        'Accept': 'application/json; application/vnd.esios-api-v2+json',
        'Content-Type': 'application/json',
        'Host': 'api.esios.ree.es',
        'Authorization': 'Token token=\"1137b6e6ef7fe4cbc99876e9810753817a5770c72acc3e4842e4905366b2dce6\"'
    };

    const options = {
        headers: new Headers(headersDict),
    };

    const url = 'https://api.esios.ree.es/indicators/1001'

    fetch(url, options)
        .then(res =>{
            return res.json();
        })
        .then(res => {
            console.log(res);
        });

    return (
        <div>
            <p>Hola</p>
        </div>
    );
};

export default PriceVisualizer;