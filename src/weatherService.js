const API_KEY = 'f9fd9e11ba42b0be959530affd2f6b03'

const makeIconURL = (iconId) => `https://ssl.gstatic.com/onebox/weather/48/${iconId}partly_cloudy.png`

const getFormattedWeatherData = async (city, units='matrix')=>{
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
    .then((res)=>res.json())
    .then((data)=> data );

    const {
        weather, 
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name,
    } = data;

    const {description, icon}= weather[0];

    return {
        description,
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
    }
}



export {getFormattedWeatherData};