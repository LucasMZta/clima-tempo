document.querySelector('.busca').addEventListener('submit',async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '' ) {
        clearInfo();
        showWarning('Carregando...');
        let key = '2beee7ead172958c7775cc47914501f3';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${key}&units=metric&lang=pt_br`;
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            showWarning('Encontrado!');
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                tempDesc: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização!');
        }
    } else {
        clearInfo();
    }
    
});

function showInfo(json) {
    showWarning('');
    
    
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`;
    document.querySelector('.temp img').title = json.tempDesc;

    document.querySelector('.ventoPonto').style.transform = `rotate(${(json.windAngle - 90)}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}
function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    let text = document.querySelector('.aviso');
    text.innerHTML = msg;
    // text.style.backgroundColor = 'rgba(255,0,0,.4)';

}